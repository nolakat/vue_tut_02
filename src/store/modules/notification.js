export const namespaced = true 


export const state ={
    notifications: []
}

let nextId = 1 

export const mutations = {
    PUSH(state, notification){
        state.notifications.push({
            ...notification,
            id: nextId++ 
        })
    },
    DELETE(state, notificationToRemove){
        console.log('DELETE NOTIFCATION', notificationToRemove.id);
        state.notifications = state.notifications.filter(
            notification => notification.id !== notificationToRemove.id
        )
        console.log('state', state.notifications)
    }
}

export const actions = {
    add({ commit }, notification){
        commit('PUSH', notification)
    },
    remove({ commit }, notification){
        commit('DELETE', notification)
    }
}