<template>
<div>
    <goback class="mb-3" />
    <CCard class="p-3">
        <small class="text-muted">Lista de postgraduantes inscritos</small>
        <h5 class="w-75 font-weight-bold">{{inscritos.materia.nombre}} - {{inscritos.materia.sigla}} {{inscritos.materia.credito}}</h5>
        <CRow>
            <CCol col="12" sm="6">
                <small class="text-muted">Curso de postgrado</small><br>
                <strong class="h6">{{inscritos.postgrado}}</strong>
            </CCol>
            <CCol col="12" sm="4">
                <small class="text-muted">Docente</small><br>
                <strong class="h6">{{inscritos.docente}}</strong>
            </CCol>
            <!-- <CCol col="12" sm="2">
                <small class="text-muted">Credito</small><br>
                <strong class="h6">{{inscritos.materia.credito}}</strong>
            </CCol> -->
        </CRow>
    </CCard>
    <CCard>
        <CCardHeader>
            <strong>Postgraduantes inscritos</strong>
        </CCardHeader>
        <table class="table table-hover   table-sm ">
            <thead>
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col">Nombre Completo</th>
                    <th scope="col">Fecha inscripcion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(input,index) in inscritos.postgraduantes" :key="input.id">
                    <td class="text-center"><strong>{{index+1}}</strong></td>
                    <td>
                        {{input.full_name}}
                    </td>
                    <td>
                        {{input.fecha_registro}}
                    </td>
                </tr>
            </tbody>
        </table>
    </CCard>
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>

<script>
import ToastProps from '@/components/ShowToast'
export default {
    data() {
        return {
            inscritos: {
                materia: {}
            },
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    mounted() {
        this.getInscritosMateria(
            this.$route.params.idPostgrado,
            this.$route.params.idMateria,
            this.$route.params.idDocente,
        )
    },
    components: {
        ToastProps
    },
    methods: {
        getInscritosMateria(ID_POSTGRADO, ID_MATERIA, ID_DOCENTE) {
            axios
                .get(`/postgraduantes-inscritos-materia/${ID_POSTGRADO}/${ID_MATERIA}/${ID_DOCENTE}`)
                .then(response => {
                    if (response.data.success) {
                        this.inscritos = response.data.data;
                    } else {
                        this.showToast(
                            response.data.message,
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
    }
}
</script>

<style>
</style>
