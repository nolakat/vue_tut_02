import EventService from '@/services/EventService.js'

export const namespaced = true


export const state = {
event_total: 0,
event: {},
events: [],
perPage: 3
}

export const mutations = {
    ADD_EVENT(state, event){
    state.events.push(event)
    },
    SET_EVENTS(state, events) {
    state.events = events 
    },
    SET_TOTAL_EVENTS(state, total){
    state.event_total = total
    },
    SET_EVENT(state, event){
    state.event = event
    }
}

export const actions ={
createEvent({ commit, dispatch}, event ) {
  return EventService.postEvent(event).then(()=> {
    commit('ADD_EVENT', event)

    const notification = {
      type: 'success',
      message: 'Your Event has been created'
    }
    dispatch('notification/add', notification, { root: true })
  })
  .catch(error => {

    const notification = {
      type: 'error',
      message: 'There was a problem creating your Event ' + error.message
    }
    dispatch('notification/add', notification, { root: true })
    throw Error

  })
}, 
fetchEvents({ commit, dispatch, state }, { page }){
  return EventService.getEvents(state.perPage, page)
  .then(response => {
    commit('SET_EVENTS', response.data)
    commit('SET_TOTAL_EVENTS', response.headers['x-total-count'])
  })
  .catch(error => {
     const notification = {
       type: 'error',
       message: 'There was a problem fetching events: ' + error.message
     }
     dispatch('notification/add', notification, { root: true })

  })
},
fetchEvent({ commit, getters }, id){
  var event = getters.getEventById(id)

  if(event) {
    commit('SET_EVENT', event)
    return event 
  } else {
    return EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
            return response.data
          })
  }
  
}
}

export const getters = {
    catLength: state => {
    return state.categories.length
    },
    doneTodos: state => {
    return state.todos.filter(todo => todo.done)
    },
    activeTodos: state => {
    return state.todos.filter(todo => !todo.done)
    },
    getEventById: state => id => {
    return state.events.find(event => event.id === id)
    }
}
