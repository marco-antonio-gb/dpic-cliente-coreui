<template>
<div>
    <goback class="mb-3" />
    <CCard class="p-3">
        <small class="text-muted">Calificaciones Asignatura</small>
        <h5 class="w-75 font-weight-bold">{{materia.sigla}} - {{materia.nombre}}</h5>
        <CRow>
            <CCol col="12" sm="6">
                <small class="text-muted">Curso de postgrado</small><br>
                <strong class="h6">{{postgrado}}</strong>
            </CCol>
            <CCol col="12" sm="4">
                <small class="text-muted">Docente</small><br>
                <strong class="h6">{{docente}}</strong>
            </CCol>
            <CCol col="12" sm="2">
                <small class="text-muted">Credito</small><br>
                <strong class="h6">{{materia.credito}}</strong>
            </CCol>
        </CRow>
    </CCard>
    <form @submit.prevent="calificacionesStore">
        <CCard>
            <CCardHeader>
                <strong>Postgraduantes inscritos</strong>
            </CCardHeader>
            <table class="table table-hover   table-sm ">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col" class="text-center">Nota</th>
                        <th scope="col">Observacion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(input,index) in calificaciones.notas" :key="input.id">
                        <td class="text-center"><strong>{{index+1}}</strong></td>
                        <td>
                            {{input.full_name}}
                        </td>
                        <td class="text-center" width="8%">
                            <input type="text" class="form-control form-control-sm text-center font-weight-bold  m-auto" v-model="input.nota_numerica">
                        </td>
                        <td>
                            <input type="text" class="form-control form-control-sm" v-model="input.observacion">
                        </td>
                    </tr>
                </tbody>
            </table>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarCalificaciones">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar calificaciones </span>
            </CButton>
        </div>
    </form>
    <pre>{{calificaciones}}</pre>
    <ToastProps   :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>
<script>
import ToastProps from '@/components/ShowToast'
export default {
    data() {
        return {
            isLoading: false,
            postgrado: '',
            materia: '',
            docente: '',
            calificaciones: {
                materia_id: this.$route.params.idMateria,
                docente_id: this.$route.params.idDocente,
                postgrado_id: this.$route.params.idPostgrado,
                notas: []
            },
            postgraduantes: [],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    created() {
        // this.getDocente(this.$route.params.idDocente);
        // this.getMateria(this.$route.params.idMateria);
        // this.getPostgrado(this.$route.params.idPostgrado);
        this.getPostgradoPostgraduantes(this.$route.params.idPostgrado);
    },
    components: {
        ToastProps
    },
    methods: {
        getDocente(id) {
            axios
                .get("/usuarios/" + id)
                .then(response => {
                    if (response.data.success) {
                        this.docente = response.data.data;
                    } else {
                        console.log(response);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        },
        getMateria(id) {
            axios
                .get("/materias/" + id)
                .then(response => {
                    if (response.data.success) {
                        this.materia = response.data.data;
                    } else {
                        console.log(response);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        },
        getPostgrado(id) {
            axios
                .get("/postgrados/" + id)
                .then(response => {
                    if (response.data.success) {
                        this.postgrado = response.data.data.nombre;
                    } else {
                        console.log(response);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        },
        getPostgradoPostgraduantes() {
            this.isLoading = true;
            let postgrado_id = this.$route.params.idPostgrado;
            let materia_id = this.$route.params.idMateria;
            let docente_id = this.$route.params.idDocente;
            axios
                .get(`/calificaciones-postgrado/${postgrado_id}/${materia_id}/${docente_id}`)
                .then(response => {
                    if (response.data.success) {
                        this.isLoading = false;
                        this.generateInputs(response.data.data.calificaciones);
                        this.docente = response.data.data.docente;
                        this.postgrado = response.data.data.postgrado;
                        this.materia = response.data.data.materia;
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
        resetForm(){
            //
            // setTimeout(() => this.$router.go(-1), 2000);
        }
    }
}
</script>
<style>
</style>
