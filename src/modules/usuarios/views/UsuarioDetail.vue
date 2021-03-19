<template>
<div>
    <div class="d-flex align-items-center  mb-3">
        <div class="mr-auto">
            <goback />
        </div>
        <div class=""><button class="btn btn-primary" @click="$router.push({path:'/usuarios/update/'+$route.params.idUsuario})"> Editar usuario</button></div>
    </div>
    <CRow>
        <CCol sm="8">
            <CCard>
                <CCardHeader>
                    <strong>Informacion usuario</strong>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm="7">
                            <small class="text-muted">Nombre completo</small>
                            <h5>{{usuario.paterno}} {{usuario.materno}} {{usuario.nombres}}</h5>
                        </CCol>
                        <CCol sm="5">
                            <small class="text-muted">Cedula</small>
                            <p>{{usuario.ci}} ({{usuario.ci_ext}})</p>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="3">
                            <small class="text-muted">Correo</small>
                            <p>{{usuario.email}} </p>
                        </CCol>
                        <CCol sm="2">
                            <small class="text-muted">Celular</small>
                            <p>{{usuario.celular}}</p>
                        </CCol>
                        <CCol sm="2">
                            <small class="text-muted">Telefono</small>
                            <p>{{usuario.telefono}}</p>
                        </CCol>
                        <CCol sm="5">
                            <small class="text-muted">Profesion</small>
                            <p>{{usuario.profesion}}</p>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol sm="4">
            <CCard>
                <CCardHeader>
                    <strong>Cambiar contraseña</strong>
                </CCardHeader>
                <CCardBody>
                    <form @submit.prevent="usuarioUpdatePass">
                        <CInput placeholder="Contraseña actual" type="password" required v-model="updatePassword.current_password" />
                        <CInput placeholder="Nueva contraseña" type="password" required v-model="updatePassword.new_password" />
                        <CInput placeholder="Confirmar nueva contraseña" type="password" required v-model="updatePassword.new_confirm_password" />
                        <CButton color="dark" class="px-4  btn-block btn-sm" type="submit" :disabled="isUpdate">
                            <CSpinner color="warning" size="sm" v-if="isUpdate" />
                            <span v-if="isUpdate">
                                Procesando...</span>
                            <span v-else> Actualizar contraseña</span>
                        </CButton>
                    </form>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
 
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />
</div>
</template>

<script>
import ToastProps from '@/components/ShowToast'
import UsuarioService from '../services/UsuarioService'
export default {
    data() {
        return {
            isUpdate: false,
            usuario: {},
            updatePassword: {
                current_password: '',
                new_password: '',
                new_confirm_password: ''
            },
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: ''
        }
    },
    created() {
        this.UsuarioShow(this.$route.params.idUsuario);
    },
    mixins: [
        UsuarioService
    ],
    components: {
        ToastProps
    },
    methods: {
        usuarioUpdatePass() {
            this.show_toast = false;
            this.isUpdate = true;
            if (this.passwordConfirm(this.updatePassword.new_password, this.updatePassword.new_confirm_password)) {
                axios
                    .post("/change-password", this.updatePassword)
                    .then(response => {
                        if (response.data.success) {
                            this.isUpdate = false;
                            this.showToast(response.data.message, true, "success");
                            // this.show_toast = false;
                            this.resetForm();
                        } else {
                            this.isUpdate = false;

                            this.showToast(
                                response.data.validator,
                                true,
                                "danger"
                            );
                        }
                    })
                    .catch(error => {
                        this.isUpdate = false;
                        if (error.response.data.status == 404) {
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
            } else {
                this.showToast("Las contrasenas no coiciden", true, "warning");
                this.isUpdate = false;

            }
        },
        passwordConfirm(OLD, NEW) {
            if (OLD === NEW) {
                return true;
            } else {
                return false;
            }
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
        resetForm(){
          this.updatePassword.current_password='';
          this.updatePassword.new_password='';
          this.updatePassword.new_confirm_password='';
        }
    }
}
</script>
