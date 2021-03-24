<template>
<CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
        <CCol md="6">
            <div class="clearfix">
                <h1 class="float-left display-3 mr-4">403</h1>
                <h4 class="pt-3">ACCESO DENEGADO</h4>
                <p class="text-muted">No tiene los permisos para poder acceder a la pagina.</p>
                 <CButton color="primary"  @click="$router.go(-1)">

                Volver a la pagina anterior
            </CButton>
            </div>
           
        </CCol>
    </CRow>
</CContainer>
</template>

<script>
export default {
    name: 'Page500'
}
</script>
