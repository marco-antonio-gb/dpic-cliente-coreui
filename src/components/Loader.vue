<template>
   <div class="text-center text-primary" v-if="isLoading">
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
export default {
     name:'loader',
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
    },
}
</script>
<style>
</style>