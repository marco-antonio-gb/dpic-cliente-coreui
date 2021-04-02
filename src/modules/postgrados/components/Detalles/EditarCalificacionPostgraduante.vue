<template>
<div class="mb-5">
    <goback class="mb-3" />
    <hr>
    <form @submit.prevent="calificacionUpdate($route.params.idCalificacion)">
        <div class="card mb-1 p-1">
          <p class="mb-1 ml-2 ">POSTGRADUANTE: <strong>{{calificacion_postgraduante.postgraduante}}</strong> </p>
        <p class="mb-1 ml-2 ">MATERIA: <strong>{{calificacion_postgraduante.calificacion.sigla}} - {{calificacion_postgraduante.calificacion.asignatura}}</strong> </p>
        <small class="mb-1 ml-2 ">POSTGRADO: {{calificacion_postgraduante.postgrado}}</small>
        </div>
        <CCard bodyWrapper>
            <CRow>
                <CCol sm="3">
                    <CInput label="Nota Final" v-model="calificacion_postgraduante.calificacion.nota_numerica" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Fecha registro" readonly v-model="calificacion_postgraduante.calificacion.fecha_registro" />
                </CCol>
                <CCol sm="6">
                    <CInput label="Observaciones" v-model="calificacion_postgraduante.calificacion.observacion" />
                </CCol>
            </CRow>
        </CCard>
        <div class="text-right mb-3">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelar">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Actualizar informacion </span>
            </CButton>
        </div>
    </form>
 
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>
<script>
import ToastProps from '@/components/ShowToast'
// import InscripcionService from '@/modules/inscripciones/services/InscripcionService'
export default {
    name: 'postgrado-postgraduante',
    data() {
        return {
            isLoading: false,
            calificacion_postgraduante:{
              calificacion:{},
            },
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    mounted() {
        this.getPostgraduanteCalificacion(
          this.$route.params.idPostgrado,
          this.$route.params.idPostgraduante,
          this.$route.params.idCalificacion
        )
    
    },
    components: {
        ToastProps
    },
    methods: {
        calificacionUpdate(ID_CALIFICACION) {
            this.show_toast = false;
            this.isLoading = true;
            axios
                .put("/calificaciones/" + ID_CALIFICACION, this.calificacion_postgraduante.calificacion)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.showToast(response.data.message, true, "success");
                        this.resetForm();
                    } else {
                        this.isLoading = false;
                        this.showToast(response.data.message, true, "danger");
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        this.showToast(
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(error.request, true, "danger");
                    } else {
                        this.showToast(error.message, true, "danger");
                    }
                });
        },
        getPostgraduanteCalificacion(ID_POSTGRADO, ID_POSTGRADUANTE, ID_CALIFICACION) {
            axios
                .get("/editar-calificacion-postgraduante/" + ID_POSTGRADO + '/' + ID_POSTGRADUANTE + '/'+ID_CALIFICACION)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.calificacion_postgraduante = response.data.data;
                    } else {
                        this.isLoading = false;
                        this.showToast(response.data.message, true, "danger");
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        this.showToast(
                            error.response.data.message,
                            true,
                            "danger"
                        );
                    } else if (error.request) {
                        this.showToast(error.request, true, "danger");
                    } else {
                        this.showToast(error.message, true, "danger");
                    }
                });
        },
        
        resetForm() {
        
                this.calificacion_postgraduante={}
                this.calificacion_postgraduante.calificacion = {}
        },
        cancelar() {
            this.resetForm();
            this.$router.go(-1);
        },
        showToast(message, status, color) {
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
    },
}
</script>
<style>
</style>
