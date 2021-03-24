<template>
<div>
  <div v-if="$can('read', 'Materia')">
    <button @click="createPost">Add Post</button>
 
  </div>
</div>
</template>

<script>
 import example from '@/services/example'
export default {
  data(){
    return{
      msg:"Holaaaaa"
    }
  },
  mixins:[
    example
  ],
  methods:{
    createPost(){
      console.log("METODO")
    }
  },
  // created(){
  //   console.log(this.getRoles())
  // }
 
}
</script>

<style>

</style>