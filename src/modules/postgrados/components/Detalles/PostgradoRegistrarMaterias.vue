<template>
<div class="mb-3">
    <goback class="mb-3" />
    <form @submit.prevent="PostgradoMateriaStore">
        <CCard bodyWrapper>
            <div class="text-center p-3" v-if="postgrado.materias.length===0">
                <button class="btn btn-secondary " @click.prevent="addLineMaterias(1)">Registrar Materias</button>
            </div>
            <div class="card-outline p-1 form-group mb-0" v-for="(input,k) in postgrado.materias" :key="k">
                <div class="   m-0 p-0">
                    <CRow>
                        <CCol sm="4">
                            <CInput label="Nombre materia" required placeholder="Nombre del materia" v-model="input.nombre" />
                        </CCol>
                        <CCol sm="2">
                            <CInput label="Sigla" type="text" placeholder="Sigla" required v-model="input.sigla" />
                        </CCol>
                        <CCol sm="1">
                            <CInput label="Credito" placeholder="0.0 " v-model="input.credito" />
                        </CCol>
                        <CCol sm="3">
                            <div class="form-group">
                                <label for="uid-l744h660att" class=""> Docente </label>
                                <select required id="dropDown" class="form-control" v-model="input.docente_id">
                                    <option value="">Seleccionar...</option>
                                    <option v-for="postgrado in load_materias" :key="postgrado.id" v-bind:value="postgrado.idUsuario">
                                        {{ postgrado.full_name }}
                                    </option>
                                </select>
                            </div>
                        </CCol>
                        <CCol sm="2" class="m-auto pt-2">
                            <!-- <CButtonGroup> -->
                            <CButton color="secondary" class="mr-1" size="sm" @click.prevent="removeInputMaterias(k)" v-show="k || ( !k && postgrado.materias.length > 0)">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton color="dark" size="sm" @click.prevent="addLineMaterias(k+2)" v-show="k == postgrado.materias.length-1">
                                <CIcon name="cil-plus" />
                            </CButton>
                            <!-- </CButtonGroup> -->
                        </CCol>
                    </CRow>
                </div>
            </div>
        </CCard>
        <CCard bodyWrapper>
            <CRow>
                <CCol sm="7" class="text-right">
                    <strong>  Total Horas: {{total_horas}}</strong> 
                </CCol>
            </CRow>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarMateriaPostgrado">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>
<script>
import PostgradoService from '../../services/PostgradoService'
import CustomService from '../../services/CustomService'
import ToastProps from '@/components/ShowToast'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
            postgrado: {
                postgrado_id: this.$route.params.idPostgrado,
                materias: [{
                    nombre: '',
                    sigla: '',
                    credito: '',
                    docente_id: ''
                }]
            },
            load_materias: [],
            selected: []
        }
    },
    created() {
        this.getDocentes()
    },
    mixins: [
        PostgradoService,
        CustomService
    ],
    components: {
        ToastProps
    },
    methods: {
        getDocentes() {
            axios
                .get("/docentes")
                .then(response => {
                    if (response.status === 200 && response.data.data) {
                        (this.load_materias = response.data.data)
                    } else {
                        this.showToast(response.data.message, true, "");
                    }
                })
                .catch(error => {
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
        removeInputMaterias(index) {
            this.postgrado.materias.splice(index, 1);
        },
        addLineMaterias(k) {
            let checkEmptyLines = this.postgrado.materias.filter(
                line => line.item === null
            );
            if (
                checkEmptyLines.length >= 1 &&
                this.postgrado.materias > 0
            )
                return;
            this.postgrado.materias.push({
                nombre: '',
                sigla: '',
                credito: 0,
                docente_id: ''
            });
        },
        cancelarMateriaPostgrado() {
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
        resetForm() {
            this.postgrado.materias = []
        },
        cancelarMateria() {
            this.resetForm();
            this.$router.go(-1);
        },
        PostgradoMateriaStore() {
            this.show_toast = false;
            if (this.postgrado.materias.length <= 0) {
                this.showToast(
                    "Registre al menos una materia",
                    true,
                    ""
                );
            } else {
                this.isLoading = true;
                axios
                    .post("/materias", this.postgrado)
                    .then(response => {
                        if (response.data.success) {
                            this.isLoading = false;
                            this.showToast(response.data.message, true, "success");
                            // this.show_toast = false;
                            this.resetForm();
                        } else {
                            if (response.data.validator) {
                                this.showToast(
                                    response.data.validator,
                                    true,
                                    "warning" 
                                );
                                // this.show_toast = false;
                            } else {
                                console.log("nada");
                            }
                            this.isLoading = false;
                            // this.show_toast = false;
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log(error.response.data.message);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                            // this.log_out(true);
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log("Error", error.message);
                        }
                        this.isLoading = false;
                    });
            }
        },
    },
    computed: {
        total_horas() {
            return this.postgrado.materias.reduce((acc, cur) => acc + Number(cur.credito), 0);
        }
    }
    // computed: {
    //     selectAll: {
    //         get: function () {
    //             return this.users ? this.selected.length == this.users.length : false;
    //         },
    //         set: function (value) {
    //             var selected = [];
    //             if (value) {
    //                 this.users.forEach(function (user) {
    //                     selected.push(user.id);
    //                 });
    //             }
    //             this.selected = selected;
    //         }
    //     }
    // }
}
</script>
<style>
</style>
