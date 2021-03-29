<template>
<div class="mb-5">
    <goback class="mb-3" />
    <h2 class="text-center font-weight-bold">Detalle Pagos / {{postgraduante_pago.postgrado_gestion}}</h2>

    <loader class="mb-3" :isLoading="isLoading" />
    <CCardHeader>
        <div class="d-flex justify-content-between align-items-center">
            <div class="card-title m-0">
                <p class="m-0">POSTGRADUANTE: <strong>{{postgraduante_pago.postgraduante.full_name}}</strong> </p>
                <p class="m-0">POSTGRADO: {{postgraduante_pago.postgrado}}</p>
            </div>
            <CButtonGroup>

                <CButton color="success" class="px-4" size="sm" :disabled="isDownload" @click="reportePagosPostgraduante($route.params.idPostgrado,$route.params.idPostgraduante,postgraduante_pago.postgraduante.full_name)">
                    <CSpinner color="primary" size="sm" v-if="isDownload" class="mr-1" />
                    <span v-if="isDownload">
                        <CIcon name="cil-print"></CIcon> Descargando...
                    </span>
                    <span v-else>
                        <CIcon name="cil-print"></CIcon> PDF
                    </span>
                </CButton>

            </CButtonGroup>
        </div>
    </CCardHeader>
    <CCard>
        <table class="table table-hover table-sm">
            <thead>
                <th>Item</th>
                <th class="text-center">Nro. Boleta</th>
                <th class="text-center">Costo [Bs.]</th>
                <th class="text-center">Fecha de cobro</th>
                <th class="text-center">Observacion</th>
                <th class="text-right">Opciones</th>
            </thead>
            <tbody>
                <tr v-for="pago in postgraduante_pago.pagos" :key="pago.id">
                    <td><strong>{{pago.item}}</strong></td>
                    <td class="text-center">{{pago.boleta}}</td>
                    <td class="text-center">{{pago.costo_unitario | formatNumber}}</td>
                    <td class="text-center">{{pago.fecha_cobro}}</td>
                    <td class="text-center">{{pago.observacion}}</td>
                    <td class="text-right">
                        <CButtonGroup>

                            <CButton color="secondary" size="sm" @click="$router.push({path:
                                  '/postgrados/editar-pagos/'
                                  +$route.params.idPostgrado+
                                  '/postgraduante/'
                                  +postgraduante_pago.postgraduante.idPostgraduante+
                                  '/pago/'
                                  +pago.idPago
                                })">
                                <CIcon name="cil-dollar"></CIcon> Editar pago
                            </CButton>
                        </CButtonGroup>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="text-right font-weight-bold">Total</td>
                    <td class="font-weight-bold text-center "> {{total_pago | formatNumber}}</td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
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
import CustomService from '../../services/CustomService'
export default {
    name: 'postgrado-postgraduante',
    data() {
        return {
            selected: null,
            isLoading: true,
            isDownload: false,
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
    },
    components: {
        ToastProps
    },
    mixins: [
        CustomService
    ],
    methods: {
        getPostgraduantePagos() {
            this.isLoading = true;
            this.show_toast = false
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
