<template>
<div class="mb-5">
    <goback class="mb-3" />
    <form @submit.prevent="InscripcionStore($route.name)" id="PostgradoStore">
        <h6 class="mb-1"> CURSO DE POSTGRADO: {{postgrado_label}}</h6>
        <CCard bodyWrapper class="mb-2" v-if="$route.name==='postgrado-postgraduante-nuevo'">
            <!-- <p class="mb-1 ml-2 font-weight-bold">Postgraduante nuevo</p> -->
            <CRow>
                <CCol sm="4">
                    <CInput label="Paterno" type="text" required placeholder="Apellido Paterno" v-model="inscripcion.postgraduante.paterno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Materno" placeholder="Apellido Materno" type="text" required v-model="inscripcion.postgraduante.materno" />
                </CCol>
                <CCol sm="4">
                    <CInput label="Nombres" placeholder="Nombres" type="text" required v-model="inscripcion.postgraduante.nombres" />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="2">
                    <CInput label="C.I." placeholder="cedula " v-model="inscripcion.postgraduante.ci" />
                </CCol>
                <CCol sm="2">
                    <div class="form-group">
                        <label for="uid-l744h660att" class=""> Externsion C.I. </label>
                        <select required id="dropDown" class="form-control" v-model="inscripcion.postgraduante.ci_ext">
                            <option disabled value="">Extension </option>
                            <option v-for="ext in options_ci" :key="ext.id" v-bind:value="ext.value">
                                {{ ext.text }}
                            </option>
                        </select>
                    </div>
                </CCol>
                <CCol sm="4">
                    <CInput label="Lugar Nacimiento" placeholder="lugar" v-model="inscripcion.postgraduante.lugar_nac" />
                </CCol>
                <CCol sm="2">
                    <CInput label="Telefono Domicilio" placeholder="telefono fijo" v-model="inscripcion.postgraduante.telf_domicilio" />
                </CCol>
                <CCol sm="2">
                    <CInput label="Celular" placeholder="celular" v-model="inscripcion.postgraduante.celular" />
                </CCol>
            </CRow>
            <CRow>
            </CRow>
            <CRow>
                <CCol sm="3">
                    <CInput label="Correo" placeholder="email" v-model="inscripcion.postgraduante.correo" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Profesion" placeholder="profesion" v-model="inscripcion.postgraduante.profesion" />
                </CCol>
                <CCol sm="6">
                    <CInput label="Observaciones" placeholder="observaciones" v-model="inscripcion.postgraduante.observaciones" />
                </CCol>
            </CRow>
            <CRow>
            </CRow>
        </CCard>
        <CCard bodyWrapper class="mb-2" v-if="$route.name==='postgrado-postgraduante-existente'">
            <p class="mb-1 ml-2 font-weight-bold">Postgraduante existente</p>
            <CRow>
                <CCol sm="12">
                    <div class="form-group">
                        <label class=""> Postgraduante registrados</label>
                        <select required class="form-control" v-model="inscripcion.postgraduante_id">
                            <option disabled value="">Seleccion un postgraduante </option>
                            <option v-for="postgraduante in postgraduantes" :key="postgraduante.id" v-bind:value="postgraduante.idPostgraduante">
                                {{ postgraduante.full_name }} - {{postgraduante.cedula}}
                            </option>
                        </select>
                    </div>
                </CCol>
            </CRow>
        </CCard>
        <p class="mb-1 ml-2 font-weight-bold">Pagos</p>
        <CCard bodyWrapper>
            <div class="text-center p-3" v-if="inscripcion.pagos.length===0">
                <button class="btn btn-secondary " @click.prevent="addLinePagos(1)">Registrar plan de pagos</button>
            </div>
            <div class="card-outline p-1 form-group" v-for="(input,k) in inscripcion.pagos" :key="k">
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
                            <CButton color="secondary" size="sm" @click.prevent="removeInputPago(k)" v-show="k || ( !k && inscripcion.pagos.length > 0)">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton color="dark" size="sm" @click.prevent="addLinePagos(k+2)" v-show="k == inscripcion.pagos.length-1">
                                <CIcon name="cil-plus" />
                            </CButton>
                        </CButtonGroup>
                    </div>
                </div>
            </div>
            <div class="p-2">
                <strong>TOTAL: {{total_pagos}}</strong>
            </div>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarInscripcionAdd">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
    <!-- <pre>{{inscripcion}}</pre> -->
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>

<script>
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
import ToastProps from '@/components/ShowToast'
import InscripcionService from '@/modules/inscripciones/services/InscripcionService'
export default {
    name: 'postgrado-postgraduante',
    data() {
        return {
            select_precio: '',
            select_pagos: '',
            selected: null,
            isLoading: false,
            inscripcion: {
                gestion: today.getFullYear(),
                fecha_registro: date,
                postgraduante: {
                    paterno: '',
                    materno: '',
                    nombres: '',
                    ci: '',
                    ci_ext: '',
                    lugar_nac: '',
                    fecha_nac: '',
                    direc_domicilio: '',
                    nro_domicilio: '',
                    telf_domicilio: '',
                    celular: '',
                    correo: '',
                    profesion: '',
                    lugar_trabajo: '',
                    telf_trabajo: '',
                    lugar_estudio: '',
                    observaciones: '',
                    foto: '',
                },
                postgrado_id: this.$route.params.idPostgrado,
                postgraduante_id: '',
                pagos: [],
            },
            postgraduantes: [],
            postgrado_label: '',
            options_ci: [{
                    value: "OR",
                    text: "ORURO"
                },
                {
                    value: "LP",
                    text: "LA PAZ"
                },
                {
                    value: "PT",
                    text: "POTOSI"
                },
                {
                    value: "CB",
                    text: "COCHABAMBA"
                },
                {
                    value: "CH",
                    text: "CHUQUISACA"
                },
                {
                    value: "TJ",
                    text: "TARIJA"
                },
                {
                    value: "SC",
                    text: "SANTA CRUZ"
                },
                {
                    value: "BN",
                    text: "BENI"
                },
                {
                    value: "PD",
                    text: "PANDO"
                }
            ],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
        }
    },
    created() {
        var URL = this.$route.name;
        if (URL === "postgrado-postgraduante-existente") {
            this.getPostgraduantes()
        }
        this.getPostgrado()
    },
    mixins: [
        InscripcionService
    ],
    components: {
        ToastProps
    },
    computed: {
        total_pagos() {
            return this.inscripcion.pagos.reduce((acc, cur) => acc + Number(cur.costo_unitario), 0);
        },
    },
    methods: {
        removeInputPago(index) {
            this.inscripcion.pagos.splice(index, 1);
        },
        addLinePagos(k) {
            let label = 'Cuota Nro.  ';
            let checkEmptyLines = this.inscripcion.pagos.filter(
                line => line.item === null
            );
            if (
                checkEmptyLines.length >= 1 &&
                this.inscripcion.pagos > 0
            )
                return;
            if (k === 1) {
                label = "Matricula"
            } else {
                label = label + (k - 1)
            }
            this.inscripcion.pagos.push({
                item: label,
                costo_unitario: null,
                boleta: '',
                fecha_cobro: date,
                observacion: null,
            });
        },
        someHandler(e) {
            let ide = e.target.value;
            var __POSTS = this.postgrados;
            var __FOUND = -1;
            for (var i = 0; i < __POSTS.length; i++) {
                if (__POSTS[i].idPostgrado == ide) {
                    __FOUND = __POSTS[i];
                    break;
                }
            }
            this.select_precio = __FOUND.precio;
            this.select_pagos = __FOUND.cantidad_pagos;
        },
        getPostgrado() {
            axios
                .get("/postgrados/" + this.$route.params.idPostgrado)
                .then(response => {
                    if (response.data.success) {
                        this.postgrado_label = response.data.data.nombre;
                    } else {
                        console.log(response);
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        console.log(error.response.data.message);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                });
        },
        getPostgraduantes() {
            axios
                .get("/postgraduantes-inscripciones/" + this.$route.params.idPostgrado)
                .then(response => {
                    if (response.data.success) {
                        this.postgraduantes = response.data.data;
                    } else {
                        console.log(response);
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    if (error.response) {
                        console.log(error.response.data.message);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                });
        },
        resetForm() {
            (this.inscripcion.postgraduante.paterno =
                ""), (this.inscripcion.postgraduante.materno =
                ""), (this.inscripcion.postgraduante.nombres =
                ""), (this.inscripcion.postgraduante.ci =
                ""), (this.inscripcion.postgraduante.ci_ext =
                ""), (this.inscripcion.postgraduante.lugar_nac =
                ""), (this.inscripcion.postgraduante.fecha_nac =
                ""), (this.inscripcion.postgraduante.direc_domicilio =
                ""), (this.inscripcion.postgraduante.nro_domicilio =
                ""), (this.inscripcion.postgraduante.telf_domicilio =
                ""), (this.inscripcion.postgraduante.celular =
                ""), (this.inscripcion.postgraduante.correo =
                ""), (this.inscripcion.postgraduante.profesion =
                ""), (this.inscripcion.postgraduante.lugar_trabajo =
                ""), (this.inscripcion.postgraduante.telf_trabajo =
                ""), (this.inscripcion.postgraduante.lugar_estudio =
                ""), (this.inscripcion.postgraduante.observaciones =
                ""), (this.inscripcion.postgraduante.foto =
                ""), (this.inscripcion.postgrado_id = this.$route.params.idPostgrado), (this.inscripcion.pagos = []);
            this.select_precio = "";
            this.select_pagos = "";
            this.selected = null;
        },
        cancelarInscripcionAdd() {
            this.resetForm();
            this.$router.go(-1);
        }
    },
}
</script>

<style>
</style>
