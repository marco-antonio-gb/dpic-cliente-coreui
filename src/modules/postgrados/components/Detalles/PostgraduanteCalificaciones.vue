<template>
<div class="mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <goback />
        <CButton color="success" class="px-4" size="sm" :disabled="isDownload" @click="reporteCalificacionesPostgraduante($route.params.idPostgrado,$route.params.idPostgraduante,calificaciones.postgraduante)">
            <CSpinner color="primary" size="sm" v-if="isDownload" class="mr-1" />
            <span v-if="isDownload">
                <CIcon name="cil-print"></CIcon> Descargando...
            </span>
            <span v-else>
                <CIcon name="cil-print"></CIcon> Reporte PDF
            </span>
        </CButton>
    </div>

    <CCard class="p-3">
        <small class="text-muted">Postgraduante</small>
        <h5 class="w-75 font-weight-bold"> {{calificaciones.postgraduante}} </h5>
        <CRow>
            <CCol col="12" sm="6">
                <small class="text-muted">Curso de postgrado</small><br>
                <strong class="h6">{{calificaciones.postgrado}} / {{calificaciones.postgrado_gestion}}</strong>
            </CCol>
            <CCol col="12" sm="6">
                <small class="text-muted">Nro Materias</small><br>
                <strong class="h6">{{calificaciones.cantidad_materias}}</strong>
            </CCol>

        </CRow>
    </CCard>
    <!-- <form @submit.prevent="calificacionesStore"> -->
            <loader class="mb-3" :isLoading="isLoading" />
    <CCard>
        <CCardBody class="p-2">

            <table class="table table-hover   table-sm table-bordered mb-0">
                <thead class="headtTable">
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col">Nombre Materia</th>
                        <th scope="col" class="text-center">Nota Numerica</th>
                        <th scope="col">Nota Literal</th>

                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(calificacion,index) in calificaciones.calificaciones" :key="calificacion.id">
                        <td class="text-center">{{index+1}}</td>
                        <td> <strong class="text-dark">{{calificacion.sigla}}</strong> - {{calificacion.asignatura}} <br>
                            <span v-if="calificacion.observacion" class="text-dark"><small>{{calificacion.observacion}}</small></span></td>
                        <td class="text-center">
                            <span :class="'text-'+getColor(calificacion.nota_numerica)"><strong>{{calificacion.nota_numerica}}</strong></span>
                        </td>
                        <td>
                            <span :class="'text-'+getColor(calificacion.nota_numerica)">{{calificacion.nota_literal}}</span>
                        </td>

                        <td>
                            <router-link class="custom-link" :to="{ name: 'editar-calificaciones-postgraduante', params: { idPostgrado: $route.params.idPostgrado, idPostgraduante:$route.params.idPostgraduante,idCalificacion:calificacion.idCalificacion}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <CIcon name="cil-pencil"></CIcon> Editar
                                </a>
                            </router-link>

                            <!-- <CButton color="secondary" size="sm" @click="$router.push({path:
                                  '/postgrados/detail/'
                                  +$route.params.idPostgrado+
                                  '/postgraduantes/calificaciones-postgraduante/'
                                  +$route.params.idPostgraduante+
                                  '/editar-calificacion/'
                                  +calificacion.idCalificacion
                                })">
                                <CIcon name="cil-pencil"></CIcon> Editar
                            </CButton> -->

                        </td>

                    </tr>
                </tbody>
            </table>
        </CCardBody>

    </CCard>

    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>

<script>
import ToastProps from '@/components/ShowToast'
import CustomService from '../../services/CustomService'
export default {
    data() {
        return {
            isLoading: false,
            isDownload: false,
            postgrado: '',
            materia: '',
            docente: '',
            calificaciones: {

            },

            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    mounted() {
        this.getPostgraduanteCalificaciones(this.$route.params.idPostgrado, this.$route.params.idPostgraduante);
    },
    components: {
        ToastProps
    },
    mixins: [
        CustomService
    ],
    methods: {
        getColor(data) {
            if (data <= 75) {
                return "danger"
            } else {
                return "dark"
            }
        },
        getPostgraduanteCalificaciones(ID_POSTGRADO, ID_POSTGRADUANTE) {
            this.isLoading = true;
            axios
                .get(`/calificaciones-postgraduante/${ID_POSTGRADO}/${ID_POSTGRADUANTE}`)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.calificaciones = response.data.data
                        // this.generateInputs(response.data.data.calificaciones);
                        // this.docente = response.data.data.docente;
                        // this.postgrado = response.data.data.postgrado;
                        // this.materia = response.data.data.materia;
                    } else {
                        console.log(response);
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response.status === 500) {
                        this.showToast(
                            "Error 500 (server): " +
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.response.status == 404) {
                        this.showToast(
                            "Error 404 (server): " +
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(
                            "SERVER error request: " + error.request,
                            true,
                            "danger"
                        );
                    } else {
                        this.showToast(
                            "SERVER ?: " + error.message,
                            true,
                            "danger"
                        );
                    }
                });
        },
        generateInputs(data) {
            data.forEach(element => {
                this.calificaciones.notas.push({
                    full_name: element.full_name,
                    nota_numerica: element.nota_numerica,
                    observacion: element.observacion,
                    calificacion_id: element.idCalificacion,
                });
            });
        },
        cancelarCalificaciones() {
            this.$router.go(-1);
        },
        calificacionesStore() {
            this.isLoading = true;
            this.show_toast = false
            axios
                .post('/calificaciones', this.calificaciones)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.showToast(response.data.message, true, "success");
                        // this.show_toast = false;
                        this.resetForm();
                    } else {
                        this.showToast(
                            response.data.validator,
                            true,
                            "warning"
                        );
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response.status === 500) {
                        this.showToast(
                            "Error 500 (server): " +
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.response.status == 404) {
                        this.showToast(
                            "Error 404 (server): " +
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(
                            "SERVER error request: " + error.request,
                            true,
                            "danger"
                        );
                    } else {
                        this.showToast(
                            "SERVER ?: " + error.message,
                            true,
                            "danger"
                        );
                    }
                });
        },
        showToast(message, status, color, time) {
            if (typeof message === "string") {
                this.show_toast = status;
                this.message_toast = message;
                this.color_toast = color;
            } else {
                this.show_toast = status;
                this.message_toast = message.join("\n");
                this.color_toast = color;
            }
        },
        resetForm() {
            //
            // setTimeout(() => this.$router.go(-1), 2000);
        }
    }
}
</script>
