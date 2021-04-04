import { createStore } from 'vuex'
import router from '../router'

const firebaseURL = process.env.VUE_APP_FIREBASE_DB_URL

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    }
  },
  mutations: {
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push("/")
    },
    cargar(state, payload) {
      state.tareas = payload
    }
  },
  actions: {
    async setTareas({ commit }, tarea) {
      try {
        const res = await fetch(`${firebaseURL}/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        console.log(dataDB);
      } catch (error) {
        console.error(error);
      }
      commit('set', tarea)
    },
    async deleteTareas({ commit }, id) {
      try {
        fetch(`${firebaseURL}/${id}.json`, {
          method: 'DELETE'
        })
        commit('eliminar', id)
      } catch (error) {
        console.error(error);
      }
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    async updateTarea({ commit }, tarea) {
      try {
        const res = fetch(`${firebaseURL}/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        commit('update', tarea)
      } catch (error) {
        console.error(error);
      }
    },
    async cargarLocalStorage({ commit }) {
      try {
        const res = await fetch(`${firebaseURL}.json`)
        const dataDB = await res.json()
        const arrayTareas = []
        for (let id in dataDB) {
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)
      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {
  }
})
