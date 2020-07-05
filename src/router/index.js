import Vue from "vue";
import VueRouter from "vue-router";
import EventShow from "../views/EventShow.vue";
import EventList from "../views/EventList.vue";
import EventCreate from "../views/EventCreate.vue";
import NProgress from 'nprogress'
import store from '@/store/index'
import NotFound from '@/components/NotFound.vue'
import NetworkIssue from '@/components/NetworkIssue.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next){
        // runs after global route gaurd 
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event =>{
          routeTo.params.event = event 
          next()
      }).catch(error =>{ 
        if(error.response && error.response.stats == 404){
          next({ name: '404', params: { resource: 'event' } }) 
        } else {
          next({ name: 'network-issue' })
        }
        
    } )
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page'} }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  console.log('progress start');
  NProgress.start()
  next()
})

router.afterEach(() => {
  console.log('progress end')
  NProgress.done()
})

export default router;
