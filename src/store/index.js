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
    user: null,
    error: {tipo: null, mensaje: null}
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
    },
    setError(state, payload) {
      if (payload === null) {
        return state.error = {tipo: null, mensaje: null}
      }
      if (payload === "INVALID_PASSWORD") {
        return state.error = {tipo: 'password', mensaje: 'Contraseña Incorrecta'}
      }
      if (payload === "EMAIL_NOT_FOUND") {
        state.error = {tipo: 'email', mensaje: 'E-mail no Registrado'}
      }
      if (payload === "EMAIL_EXISTS") {
        state.error = {tipo: 'email', mensaje: 'E-mail ya Registrado'}
      }
      if (payload === "INVALID_EMAIL") {
        state.error = {tipo: 'email', mensaje: 'Formato Incorrecto de E-mail'}
      }
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
      const userLS = localStorage.getItem('user')
      if (userLS) {
        commit('setUser', JSON.parse(userLS))
      } else {
        return commit('setUser', null)
      }
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
          console.error(user.error.message);
          return commit('setError', user.error.message)
        }
        commit('setUser', user)
        commit('setError', null)
        localStorage.setItem('user', JSON.stringify(user))
        router.push("/")
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
          console.error(user.error.message);
          return commit('setError', user.error.message)
        }
        commit('setUser', user)
        commit('setError', null)
        localStorage.setItem('user', JSON.stringify(user))
        router.push("/")
      })
      .catch((error) => console.error(error))
    },
    cerrarSesion({ commit }) {
      commit('setUser', null)
      localStorage.removeItem('user')
      router.push("/login")
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user
    }
  },
  modules: {
  }
})
