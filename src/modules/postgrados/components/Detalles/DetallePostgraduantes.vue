<template>
<div>
    <CCard v-if="postgraduantes.length>0">
        <CCardHeader>
            <strong>Postgraduantes</strong>
        </CCardHeader>
        <CCardBody class="p-1">
            <table class="table table-hover  table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">CI</th>
                        <th scope="col">Celular</th>
                        <th scope="col">Profesion</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(postgraduante,index) in postgraduantes" :key="postgraduante.id">
                        <td><strong>{{index+1}}</strong></td>
                        <td>
                            <router-link class="custom-link mr-2" :to="{ name: 'postgraduantes-detail', params: { idPostgraduante: postgraduante.idPostgraduante}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <CIcon name="cilLink" size="sm" class="text-dark"></CIcon>
                                    {{postgraduante.full_name}}
                                </a>
                            </router-link>
                            <!-- <router-link :to="`/postgraduantes/detail/${postgraduante.idPostgraduante}`" class="mr-2">
                                {{postgraduante.full_name}}
                            </router-link> -->
                        </td>
                        <td>{{postgraduante.cedula}}</td>
                        <td>{{postgraduante.celular}}</td>
                        <td>{{postgraduante.profesion}}</td>
                        <td class=" ">
                            <CButtonGroup>
                                <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/registrar-pago/'+$route.params.idPostgrado+'/postgraduante/'+postgraduante.idPostgraduante})">
                                    <CIcon name="cil-dollar"></CIcon> Pagar
                                </CButton>
                                <CButton color="dark" size="sm" @click="reporteCalificacionesPostgraduante($route.params.idPostgrado,postgraduante.idPostgraduante,postgraduante.full_name+'-'+postgrado.nombre)">
                                    <CIcon name="cil-print"></CIcon> Notas
                                </CButton>
                            </CButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-right">
            </div>
        </CCardBody>
    </CCard>
    <CCard v-else>
        <CCardBody class="text-center">
            <span>No se registraron postgraduantes</span>
        </CCardBody>
    </CCard>
</div>
</template>

<script>
export default {
    props: {
        postgraduantes: {
            type: Array,
            default: []
        },
    }
}
</script>

<style>

</style>
