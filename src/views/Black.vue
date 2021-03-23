<template>
<div>
  <div v-if="$can('read', 'Materia')">
    <button @click="createPost">Add Post</button>
 
  </div>
</div>
</template>

<script>
 
export default {
  data(){
    return{
      msg:"Holaaaaa"
    }
  },
  methods:{
    createPost(){
      console.log("METODO")
    }
  },
 
}
</script>

<style>

</style>