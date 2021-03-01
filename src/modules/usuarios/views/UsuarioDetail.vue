<template>
   <h1>{{idUsuario}}</h1>
</template>

<script>
export default {
data(){
  return{
    idUsuario:this.$route.params.idUsuario
  }
}
}
</script>
 