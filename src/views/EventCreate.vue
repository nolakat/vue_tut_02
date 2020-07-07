<template>
  <div>
    <h1>Create an Event</h1>
    <form v-on:submit.prevent="createEvent">
      <BaseSelect label="Select a category" v-model="event.category" :options="categories"/>

      <h3>Name & describe your event</h3>

      <BaseInput label="Title" placeholder="Add an event title" v-model="event.title"/>
      <BaseInput label="Description" placeholder="Add a description" v-model="event.description"/>
      <BaseInput label="Location" placeholder="Add a location" v-model="event.location"/>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <BaseSelect label="Select a time" v-model="event.time" :options="times"/>

      <BaseButton
      type="submit" buttonClass="-fill-gradient">Submit</BaseButton>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit"/> -->
  </form>
 
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'


export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories,
    }
  },
  methods: {
    createEvent(){
      NProgress.start()

      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
              this.$router.push({
                name: 'event-show',
                params: { id: this.event.id }
              })
              this.event = this.createFreshEventObject()
      })
      .catch(() => {
        NProgress.done()
      })
    },
    createFreshEvent() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>
<style scoped>
 
</style>