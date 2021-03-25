<template>
<div>
    <ul>
        <li v-if="can(`${['Administradosr','Sistemas']}`)">
            <button class="btn btn-primary">Funcion A</button>
        </li>
    </ul>

</div>
</template>

<script>
export default {
     
}
</script>

<style>

</style>
