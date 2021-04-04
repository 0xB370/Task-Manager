<template>
    <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese Nombre"
      v-model.trim="tarea.nombre"
    >
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="tarea.categorias" value="JavaScript">
      <label class="form-check-label" for="inlineCheckbox1">JavaScript</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox2" v-model="tarea.categorias" value="Node.js">
      <label class="form-check-label" for="inlineCheckbox2">Node.js</label>
    </div>
    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="tarea.estado" value="Urgente">
        <label class="form-check-label" for="inlineRadio1">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" v-model="tarea.estado" value="Relax">
        <label class="form-check-label" for="inlineRadio2">Relax</label>
      </div>
    </div>
    <div class="mt-2">
      <input type="number" class="form-control" v-model.number="tarea.numero">
    </div>
    <button type="submit" class="btn btn-dark mt-2 btn-block" :disabled="deshabilitado">
      Procesar
    </button>
</template>

<script>
export default {
    name: 'Input',
    props: {
        tarea: Object
    },
    computed: {
        deshabilitado() {
        if (this.tarea.nombre.trim() === "") {
            return true
        } else {
            return false
        }
        }
    }
}
</script>