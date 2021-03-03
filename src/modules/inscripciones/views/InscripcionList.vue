<template>
  <div>
    <h1>Inscripciones List</h1>
    <router-link to="/inscripciones/add">Add</router-link> <br>
    <router-link to="/inscripciones/update/1">Update</router-link> <br>
    <router-link to="/inscripciones/detail/1">Detalle</router-link> <br>
    <pre>{{inscripciones}}</pre>
  </div>
</template>

<script>
import InscripcionService from '../services/InscripcionService'
export default {
  data(){
    return {
      inscripciones:[]
    }
  },
  created(){
    this.InscripcionIndex()
  },
  mixins:[
    InscripcionService
  ]

}
</script>

<style>

</style>