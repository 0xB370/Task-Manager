import { createStore } from 'vuex'
import router from '../router'

const firebaseURL = process.env.VUE_APP_FIREBASE_DB_URL
const signupURL = process.env.VUE_APP_SIGNUP_URL
const signinURL = process.env.VUE_APP_SIGNIN_URL

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
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
    async setTareas({ commit, state }, tarea) {
      try {
        const res = await fetch(`${firebaseURL}/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
      } catch (error) {
        console.error(error);
      }
      commit('set', tarea)
    },
    async deleteTareas({ commit, state }, id) {
      try {
        fetch(`${firebaseURL}/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
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
    async updateTarea({ commit, state }, tarea) {
      try {
        const res = fetch(`${firebaseURL}/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        commit('update', tarea)
      } catch (error) {
        console.error(error);
      }
    },
    async cargarLocalStorage({ commit, state }) {
      try {
        const res = await fetch(`${firebaseURL}/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        const arrayTareas = []
        for (let id in dataDB) {
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)
      } catch (error) {
        console.error(error);
      }
    },
    async registrarUsuario({ commit }, usuario) {
      fetch(signupURL, {
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
          returnSecureToken: true
        })
      })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          return console.error(user.error.message);
        }
        commit('setUser', user)
      })
      .catch(error => console.error(error))
    },
    async loginUsuario({ commit }, usuario) {
      fetch(signinURL, {
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          password: usuario.password,
          returnSecureToken: true
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.error) {
          return console.error(user.error.message);
        }
        commit('setUser', user)
        router.push("/")
      })
      .catch(error => console.error(error))
    }
  },
  modules: {
  }
})
