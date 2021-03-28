<template>
<div class="mb-5">
    <goback class="mb-3" />
    <form @submit.prevent="pagoStore">
        <h2 class="text-center font-weight-bold">Registrar Pagos</h2>
        <p class="mb-1 ml-2 ">POSTGRADUANTE: <strong>{{postgraduante_pago.postgraduante.full_name}}</strong> </p>
        <p class="mb-1 ml-2 ">POSTGRADO: {{postgraduante_pago.postgrado}}</p>
        <CCardHeader>
            <div class="d-flex justify-content-between align-items-center">
                <div class="card-title m-0"><strong>54</strong> items en total</div>
                <CButtonGroup>
                    <CButton color="light" size="sm">
                        PDF
                    </CButton>
                    <CButton color="light" size="sm">
                        Excel
                    </CButton>
                </CButtonGroup>
            </div>
        </CCardHeader>
        <CCard bodyWrapper>
            <div class="text-center p-3" v-if="registro_pagos.pagos.length===0">
                <button class="btn btn-secondary " @click.prevent="addLinePagos(1)">Registrar pagos</button>
            </div>
            <div class="card-outline p-1 form-group" v-for="(input,k) in registro_pagos.pagos" :key="k">
                <div class="d-flex align-items-end  m-0 p-0">
                    <div class="p-1 w-50 ">
                        <label class="control-label">Item </label>
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
                            <CButton color="secondary" size="sm" @click.prevent="removeInputPago(k)" v-show="k || ( !k && registro_pagos.pagos.length > 0)">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton color="dark" size="sm" @click.prevent="addLinePagos(k+2)" v-show="k == registro_pagos.pagos.length-1">
                                <CIcon name="cil-plus" />
                            </CButton>
                        </CButtonGroup>
                    </div>
                </div>
            </div>
        </CCard>
        <div class="text-right mb-3">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelar">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
    <CCard class="p-1">
        <div class="text-center">
            RESUMEN DE PAGOS
        </div>
        <table class="table table-sm table-bordered">
            <thead>
                <th >Item</th>
                <th class="text-center">Nro. Boleta</th>
                <th class="text-center">Costo [Bs.]</th>
                <th class="text-center">Fecha de cobro</th>
            </thead>
            <tbody>
                <tr v-for="pago in postgraduante_pago.pagos" :key="pago.id">
                    <td>{{pago.item}}</td>
                    <td class="text-center">{{pago.boleta}}</td>
                    <td class="text-center">{{pago.costo_unitario | formatNumber}}</td>
                    <td class="text-center">{{pago.fecha_cobro}}</td>
                </tr>
                <tr>
                    
                    <td colspan="2" class="text-right font-weight-bold">Total</td>
                    <td class="font-weight-bold text-center "> {{total_pago | formatNumber}}</td>
                    <td class="text-center"></td>
                </tr>

            </tbody>
        </table>
        
    </CCard>
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
            selected: null,
            isLoading: false,
            registro_pagos: {
                pagos: [],
                postgrado_id: this.$route.params.idPostgrado,
                postgraduante_id: this.$route.params.idPostgraduante,
            },
            postgraduante_pago: {
                postgrado: '',
                postgraduante: {
                    full_name: ''
                },
                pagos: []
            },
            // postgrado_label: '',
            // postgraduante: {
            //     paterno: '',
            //     materno: '',
            //     nombres: ''
            // },
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    created() {
        this.getPostgraduantePagos()
        // this.getPostgrado()
    },
    components: {
        ToastProps
    },
    methods: {
        removeInputPago(index) {
            this.registro_pagos.pagos.splice(index, 1);
        },
        addLinePagos(k) {
            let label = 'Cuota Nro.  ';
            let pagosActual = this.postgraduante_pago.pagos.length;
            let checkEmptyLines = this.registro_pagos.pagos.filter(
                line => line.item === null
            );
            if (
                checkEmptyLines.length >= 1 &&
                this.registro_pagos.pagos > 0
            )
                return;
            if (pagosActual <= 0) {
                if (k === 1) {
                    label = "Matricula"
                } else {
                    label = label + (k - 1)
                }
            } else {
                label = label + (pagosActual)
            }
            this.registro_pagos.pagos.push({
                item: label,
                costo_unitario: null,
                boleta: '',
                observacion: null,
            });
        },
        pagoStore() {
            this.show_toast = false;
            this.isLoading = true;
            if (this.registro_pagos.pagos.length <= 0) {
                this.showToast("Registre al menos un pago", true, "warning");
                this.isLoading = false;
            } else {
                axios
                    .post("/pagos", this.registro_pagos)
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
            this.registro_pagos.pagos = [];
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
    computed: {
        total_pago() {

            return this.postgraduante_pago.pagos.reduce((acc, cur) => acc + Number(cur.costo_unitario), 0);
        }
    }
}
</script>

<style>
</style>
