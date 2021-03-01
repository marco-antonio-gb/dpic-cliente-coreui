<template>
  <CFooter :fixed="false">
    <div>
      <a href="http://www.fni.uto.edu.bo/fni/index.php/dpic" target="_blank">DPIC-FNI</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Dirección de Postgrado e Investigación Científica
                                 </span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Facultad Nacional de Ingeniería</span>
      <a href="http://www.fni.uto.edu.bo/fni/">FNI</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter',
  
}
</script>
