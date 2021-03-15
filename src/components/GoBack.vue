<template>
   <div class="d-flex flex-row align-items-center text-dark">
        <div class="mr-2 ">
            <a href="javascript:void(0)" class="text-dark" @click="$router.go(-1)" >
                <CIcon name="cil-arrow-circle-left"    size="lg"  /></a>
        </div>
        <div>
            <h3 class="p-0 m-0 font-weight-bold ">{{ $route.meta.title }}</h3>
        </div>
        <div>
            <!-- another component -->
        </div>
    </div>
</template>
<script>
export default {
    name:'goback'
}
</script>
<style>
</style>