<template>
  <form @submit.prevent="procesarForm">
    <Input :tarea="tarea" />
  </form>
  <hr>
  <ListaTareas />
</template>

<script>
const shortid = require('shortid')
import {mapActions} from 'vuex'
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'

export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarForm() {
      this.tarea.id = shortid.generate()
      this.setTareas(this.tarea)
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    },
  },
}
</script>
