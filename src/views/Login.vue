<template>
    <h1 class="my-5">Iniciar Sesión</h1>
    <div class="alert alert-danger" v-if="error.tipo !== null">
        {{ error.mensaje }}
    </div>
    <form @submit.prevent="procesarForm()">
        <input 
            type="email" 
            placeholder="E-mail"
            class="form-control my-2"
            v-model.trim="email"
            :class="[error.tipo === 'email' ? 'is-invalid' : '']"
        >
        <input 
            type="password" 
            placeholder="Password"
            class="form-control my-2"
            v-model.trim="pass1"
            :class="[error.tipo === 'password' ? 'is-invalid' : '']"
        >
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="bloquear"
        >
            Ingresar
        </button>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            email: '',
            pass1: ''
        }
    },
    computed: {
        ...mapState(['error']),
        bloquear() {
            return !( (this.email.includes("@")) && 
                (this.pass1.length > 5) )
        }
    },
    methods: {
        ...mapActions(['loginUsuario']),
        async procesarForm() {
            await this.loginUsuario({email: this.email, password: this.pass1})
            if (this.error.tipo === null) {
                return
            }
            this.email = ''
            this.pass1 = ''
        }
    }
}
</script>