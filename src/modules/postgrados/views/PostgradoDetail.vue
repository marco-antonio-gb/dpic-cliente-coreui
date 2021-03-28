<template>
<div class="mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
        <CDropdown color="primary" toggler-text="Opciones">
            <CDropdownItem @click="$router.push({path:'/postgrados/inscribir-postgraduante-nuevo/'+$route.params.idPostgrado})">
                <CIcon name="cil-user-follow" class="mr-2"></CIcon> Postgraduante Nuevo
            </CDropdownItem>
            <CDropdownItem @click="$router.push({path:'/postgrados/inscribir-postgraduante-existente/'+$route.params.idPostgrado})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Postgraduante Existente
            </CDropdownItem>
            <CDropdownItem @click="$router.push({path:'/postgrados/asignar-materias/'+$route.params.idPostgrado})">
                <CIcon name="cil-user" class="mr-2"></CIcon> Materia Nueva
            </CDropdownItem>
            <CDropdownDivider></CDropdownDivider>
            <CDropdownItem @click="reportePagosPostgrado($route.params.idPostgrado, postgrado.nombre)">
                <CIcon name="cil-print" class="mr-2"></CIcon>Reporte pagos
            </CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
        </CDropdown>
    </div>
    <PostgradoHeader :postgrado="postgrado" />
     <div class="text-center"  v-if="isLoading">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>


    <CTabs   :active-tab="0" variant="pills" vertical addTabsWrapperClasses="col-md-10" addNavWrapperClasses="col-md-2" fade>
        <CTab title="Inscritos">
            <DetallePostgraduantes :postgraduantes="postgraduantes"  :postgrado_name="postgrado.nombre"/>
        </CTab>
        <CTab title="Asignaturas">
            <DetalleMaterias :docentes="docentes" />
        </CTab>
        <CTab title="Pagos">
            <DetallePagos :pagos="pagos" :postgrado_name="postgrado.nombre"/>
        </CTab>
    </CTabs>




    
</div>
</template>
<script>
import PostgradoService from '../services/PostgradoService'
import CustomService from '../services/CustomService'
import DetalleMaterias from '../components/Detalles/DetalleMaterias'
import DetallePagos from '../components/Detalles/DetallePagos'
import DetallePostgraduantes from '../components/Detalles/DetallePostgraduantes'
import PostgradoHeader from '../components/Detalles/PostgradoHeader'
export default {
    data() {
        return {
            total_creditos: 0,
            postgrado: {
                nombre: '',
                fecha_inicio: '',
                cantidad_pagos: '',
                precio: '',
                gestion: '',
                nivel_id: '',
                materias: []
            },
            postgraduantes: [],
            docentes: [],
            pagos: []
        }
    },
    created() {
        this.PostgradoShow(this.$route.params.idPostgrado);
        this.getPostgradoPostgraduantes(this.$route.params.idPostgrado);
        this.getPostgradoDocentes(this.$route.params.idPostgrado);
        this.getPagos(this.$route.params.idPostgrado);
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    components: {
        DetalleMaterias,
        DetallePagos,
        DetallePostgraduantes,
        PostgradoHeader
    },
    methods: {
        getPagos(id) {
            axios
                .get("/pagos-postgrados/" + id)
                .then(response => {
                    if (response.data.success) {
                        // this.isLoading = false;/
                        this.pagos = response.data.pagos_postgrado;
                        // this.total = response.data.total;
                    } else {
                        // this.isLoading = false;
                        this.showToast(response.data.message, true, "");
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        this.showToast(
                            "SERVER: " + error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(
                            "SERVER: " + error.request,
                            true,
                            "danger"
                        );
                    } else {
                        this.showToast(
                            "SERVER: " + error.message,
                            true,
                            "danger"
                        );
                    }
                });
        },
    }
}
</script>
