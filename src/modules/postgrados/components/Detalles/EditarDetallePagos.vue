<template>
<div class="mb-5">
    <goback class="mb-3" />

    <form @submit.prevent="pagoUpdate">

  <CCard class="p-3">
        <small class="text-muted">Postgraduante</small>
        <h5 class="w-75 font-weight-bold"> {{postgraduante_pago.postgraduante.full_name}} </h5>
        <CRow>
            <CCol col="12" sm="6">
                <small class="text-muted">Curso de postgrado</small><br>
                <strong class="h6">{{postgraduante_pago.postgrado}} / {{postgraduante_pago.postgrado_gestion}}</strong>
            </CCol>
            
        </CRow>
    </CCard>

     
        <CCard bodyWrapper>

            <CRow>
                <CCol sm="3">
                    <CInput label="Item" v-model="editarPago.item" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Costo unitario" v-model="editarPago.costo_unitario" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Nro. Boleta" v-model="editarPago.boleta" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Fecha de cobro" readonly v-model="editarPago.fecha_cobro" />
                </CCol>
                <CCol sm="12">
                    <CInput label="Observaciones" v-model="editarPago.observacion" />
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
            editarPago: {
                item: '',
                costo_unitario: '',
                boleta: '',
                observacion: '',
                postgrado_id: this.$route.params.idPostgrado,
                postgraduante_id: this.$route.params.idPostgraduante
            },
            selected: null,
            isLoading: false,

            postgraduante_pago: {
                postgrado: '',
                postgraduante: {
                    full_name: ''
                },
                pagos: []
            },

            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    created() {
        this.getPostgraduantePagos()
        this.getPago()
        // this.getPostgrado()
    },
    components: {
        ToastProps
    },
    methods: {

        pagoUpdate() {
            this.show_toast = false;
            this.isLoading = true;
            axios
                .put("/pagos/" + this.$route.params.idPago, this.editarPago)
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
        getPostgraduantePagos() {
            axios
                .get("/verificar-pagos-postgrados-postgraduante/" + this.$route.params.idPostgrado + '/' + this.$route.params.idPostgraduante)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.postgraduante_pago = response.data.data;
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
        getPago() {
            this.isLoading = true
            this.show_toast = false
            axios
                .get("/pagos/" + this.$route.params.idPago)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.editarPago = response.data.data;
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
            this.editarPago.item = '',
                this.editarPago.costo_unitario = '',
                this.editarPago.boleta = '',
                this.editarPago.observacion = ''
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
