<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-success" @click="$router.push({path:'/materias/update/'+$route.params.idMateria})"> Editar materia</button>
    </div>
    <CCard>
        <CCardBody>
            <div class="d-flex align-items-center">
                <div class="mr-auto ">
                    <h4>{{materia.nombre}} <span class="font-weight-light">{{materia.gestion}}</span> </h4>
                </div>
                <div class="p-2"> <span class="mr-3">Sigla: <strong>{{materia.sigla}}</strong> </span></div>
                <div class="p-2"><span>Credito: <strong>{{materia.credito}} </strong></span></div>
            </div>
            <CRow>
                <CCol lg="5">
                    <span class="mr-3">Descripcion: <strong>{{materia.descripcion}}</strong> </span>
                    
                </CCol>
            </CRow>
            
        </CCardBody>
    </CCard>
    <!-- <pre>{{materia}}</pre> -->
</div>
</template>
<script>
import MateriaService from '../services/MateriaService'
export default {
    data() {
        return {
            materia: {
                nombre: '',
                sigla: '',
                descripcion: '',
                credito: '',
               
            }
        }
    },
    created() {
        this.MateriaShow(this.$route.params.idMateria);
    },
    mixins: [
        MateriaService
    ],
    methods: {}
}
</script>
