<template>
    <h1 class="my-5">Iniciar Sesión</h1>
    <form @submit.prevent="loginUsuario({email, password: pass1}); limpiarForm()">
        <input 
            type="email" 
            placeholder="E-mail"
            class="form-control my-2"
            v-model.trim="email"
        >
        <input 
            type="password" 
            placeholder="Password"
            class="form-control my-2"
            v-model.trim="pass1"
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
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            email: '',
            pass1: ''
        }
    },
    computed: {
        bloquear() {
            return !( (this.email.includes("@")) && 
                (this.pass1.length > 5) )
        }
    },
    methods: {
        ...mapActions(['loginUsuario']),
        limpiarForm() {
            this.email = ''
            this.pass1 = ''
        }
    }
}
</script>