<template>
<div>
  <router-view></router-view>
   <vue-confirm-dialog></vue-confirm-dialog>
</div>
  
  
</template>

<script>
export default {
  name: 'App',
  methods:{
    
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
