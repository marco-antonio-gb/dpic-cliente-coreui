<template>
   <CCard class="bg-gradient-dark text-white p-3">
        <p class="m-0 text-muted">Curso de postgrado</p>
        <h3 class="w-75">{{postgrado.nombre}}</h3>
        <CRow>
            <CCol col="12" sm="3">
                <small class="text-muted">Gestion</small><br>
                <strong class="h5">{{postgrado.gestion}}</strong>
            </CCol>
            <CCol col="12" sm="3">
                <small class="text-muted">Nro Pagos</small><br>
                <strong class="h5">{{postgrado.cantidad_pagos}}</strong>
            </CCol>
            <CCol col="12" sm="3">
                <small class="text-muted">Costo total</small><br>
                <strong class="h5">{{postgrado.precio | formatNumber}} Bs.</strong>
            </CCol>
            <CCol col="12" sm="3">
                <small class="text-muted">Fecha Inicio</small><br>
                <strong class="h5">{{postgrado.fecha_inicio}}</strong>
            </CCol>
        </CRow>
    </CCard>
</template>

<script>
export default {
    props: {
        postgrado: {
            type: Object,
            default: null
        },
    }

}
</script>

<style>

</style>