<template>
<div class="mb-5">
    <goback class="mb-3" />

    <form @submit.prevent="pagoPostgraduanteStore">
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
            <div class="text-center p-3" v-if="registrarPagos.pagos.length===0">
                <button class="btn btn-secondary " @click.prevent="addLinePagos(1)">Registrar pagos</button>
            </div>
            <div class="card-outline p-1 form-group" v-for="(input,k) in registrarPagos.pagos" :key="k">
                <div class="d-flex align-items-end  m-0 p-0">
                    <div class="p-1 w-50 ">
                        <label class="control-label">Item:</label>
                        <input type="text" class="form-control " placeholder="por concepto de..." name="item" v-model="input.item" />
                    </div>
                    <div class="p-1 w-50 ">
                        <label class="control-label">Costo Unitario</label>
                        <input type="text" class="form-control " placeholder="Costo" name="costo_unitario" v-model="input.costo_unitario" />
                    </div>
                    <div class="p-1 w-50 ">
                        <label class="control-label">Nro. Boleta</label>
                        <input type="text" class="form-control " placeholder="Nro de boleta" v-model="input.boleta" />
                    </div>
                    <div class="p-1 w-100">
                        <label class="control-label">Observaciones:</label>
                        <input type="text" class="form-control " placeholder="Notas..." name="fecha_fin" v-model="input.observacion" />
                    </div>
                    <div class="mb-1">
                        <CButtonGroup>
                            <CButton color="secondary" size="sm" @click.prevent="removeInputPago(k)" v-show="k || ( !k && registrarPagos.pagos.length > 0)">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton color="dark" size="sm" @click.prevent="addLinePagos(k+2)" v-show="k == registrarPagos.pagos.length-1">
                                <CIcon name="cil-plus" />
                            </CButton>
                        </CButtonGroup>
                    </div>
                </div>
            </div>
            
                <h4 :class="'text-'+status_total" class="m-0">TOTAL: {{total_pagos}}</h4>
             
        </CCard>
        
        <CCard>
          <CCardHeader>
            <strong>Historial de Pagos</strong>
          </CCardHeader>
            <CCardBody class="p-2">
                <table class="table table-hover table-sm table-bordered mb-0">
                    <thead>
                        <th>Item</th>
                        <th>Nro. Boleta</th>
                        <th>Costo [Bs.]</th>
                        <th>Fecha de cobro</th>
                        <th>Observacion</th>
                    </thead>
                    <tbody>
                        <tr v-for="pago in postgraduante_pago.pagos" :key="pago.id">
                            <td><strong>{{pago.item}}</strong>
                                <span v-if="pago.observacion" class="text-dark"> <br> <small>Observacion: {{pago.observacion}}</small></span>
                            </td>
                            <td>{{pago.boleta}}</td>
                            <td>{{pago.costo_unitario | formatNumber}}</td>
                            <td>{{pago.fecha_cobro}}</td>
                            <td>{{pago.observacion}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-right font-weight-bold">Total Pagado</td>
                            <td class="font-weight-bold  "> {{postgraduante_pago.total_pagado | formatNumber}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-right font-weight-bold">Total Deuda</td>
                            <td class="font-weight-bold   ">
                                <span :class="'text-'+getcolor(postgraduante_pago.total_deuda)">
                                    {{postgraduante_pago.total_deuda | formatNumber}}
                                </span>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="background:#f0f0f0">
                            <td colspan="2" class="text-right font-weight-bold">Total Curso</td>
                            <td class="font-weight-bold  ">
                                {{postgraduante_pago.total_curso | formatNumber}}
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </CCardBody>
        </CCard>
        <div class="text-right mb-3">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarPago">Cancelar</button>
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
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
import ToastProps from '@/components/ShowToast'
// import InscripcionService from '@/modules/inscripciones/services/InscripcionService'
export default {
    name: 'postgrado-postgraduante',
    data() {
        return {
            statusTotal: "dark",
            registrarPagos: {
                pagos: [],
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
    mounted() {
        this.getPostgraduantePagos()
        // this.getPostgrado()
    },
    components: {
        ToastProps
    },
    computed: {
        total_pagos() {
            return this.registrarPagos.pagos.reduce((acc, cur) => acc + Number(cur.costo_unitario), 0);
        },
        status_total() {
            if (this.total_pagos > this.postgraduante_pago.total_deuda) {
                return "danger"
            } else if (this.total_pagos === this.postgraduante_pago.total_deuda) {
                return "success"
            } else {
                return "dark"
            }
        }
    },
    methods: {
        getcolor(data) {
            if (data === 0) {
                return "success"
            } else if (data > 0) {
                return "danger"
            }
        },
        removeInputPago(index) {
            this.registrarPagos.pagos.splice(index, 1);
        },
        addLinePagos(k) {
            let label = 'Cuota Nro.  ';
            let current_cuotas = this.postgraduante_pago.pagos.length;
            let checkEmptyLines = this.registrarPagos.pagos.filter(
                line => line.item === null
            );
            if (
                checkEmptyLines.length >= 1 &&
                this.registrarPagos.pagos > 0
            )
                return;
            if (current_cuotas) {
                label = label + (current_cuotas)
            } else if (k === 1) {
                label = "Matricula"
            } else {
                label = label + (k - 1)
            }
            if (this.total_pagos === this.postgraduante_pago.total_deuda) {
                this.showToast("La deuda se completo, no puede registrar mas pagos.", true, "warning");
                return;
            } else if (this.total_pagos > this.postgraduante_pago.total_deuda) {
                this.showToast("El monto ingresado supera la deuda actual, verifique el dato", true, "warning");
                return;
            }
            this.registrarPagos.pagos.push({
                item: label,
                costo_unitario: null,
                boleta: '',
                fecha_cobro: date,
                observacion: null,
            });
        },
        pagoPostgraduanteStore() {
            this.show_toast = false;
            if (this.registrarPagos.pagos.length > 0) {
                if (this.total_pagos === this.postgraduante_pago.total_deuda) {
                    this.isLoading = true;
                    console.log(this.registrarPagos.pagos)
                    axios
                        .post("/pagos", this.registrarPagos)
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
                } else {
                    this.showToast("Verifique el monto total registrado", true, "warning");
                }
            } else {
                this.showToast("Registre al menos un pago", true, "warning");
            }
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
        resetForm() {
            this.registrarPagos.pagos = []
        },
        cancelarPago() {
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
