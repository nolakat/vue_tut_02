import axios from 'axios'
import NProgress from 'nprogress'


const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

apiClient.interceptors.request.use(config => {
    // console.log('START')
    NProgress.start()
    return config
})

apiClient.interceptors.response.use(response => {
    // console.log('DONE')
    NProgress.done()
    return response 
})

//to run events json db: json-server --watch db.json
//to delay: json-server -d 1500 db.json


export default{
    getEvents(perPage, page) {
        return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
    },
    getEvent(id){
        return apiClient.get('/events/' + id)
    },
    postEvent(event){
        return apiClient.post('/events', event)
    }
}