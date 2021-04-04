<template>
    <h1 class="my-5">Registro de Usuario</h1>
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
    <input 
        type="password"
        placeholder="Repetir Password"
        class="form-control my-2"
        v-model.trim="pass2"
    >
    <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="bloquear"
    >
        Registrar
    </button>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    computed: {
        bloquear() {
            return !( (this.email.trim() !== "") && (this.email.includes("@")) && 
                (this.pass1.length > 5) && (this.pass1 === this.pass2) )
        }
    }
}
</script>