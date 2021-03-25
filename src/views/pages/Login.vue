<template>
<div class="c-app flex-row align-items-center">
    <CContainer>
        <CRow class="justify-content-center">
            <CCol md="8">
                <CCardGroup>
                    <CCard class="p-3" body-wrapper>
                        <CCardBody>
                            <CForm @submit.prevent="handleSubmit">
                                <h1>Iniciar sesion</h1>
                                <p class="text-muted">
                                    Use su cuenta para ingresar al sistema
                                </p>
                                <CInput placeholder="Username" v-model="form.email" :class="{
                                            'is-invalid': submitted && !form.email,
                                        }" required>
                                    <template #prepend-content>
                                        <CIcon name="cil-user" /></template>
                                </CInput>
                                <CInput placeholder="Password" v-model="form.password" type="password" :class="{
                                            'is-invalid':
                                                submitted && !form.password,
                                        }" required>
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked" /></template>
                                </CInput>

                                <CButton color="dark" class="px-4 btn-block" type="submit" :disabled="submitted">
                                    <CSpinner color="warning" size="sm" v-if="submitted" />
                                    <span v-if="submitted">
                                        Verificando...</span>
                                    <span v-else> Inicias Sesion </span>
                                </CButton>
                            </CForm>

                            <CAlert color="danger" closeButton v-if="error">
                                {{ error}}
                            </CAlert>
                        </CCardBody>
                    </CCard>
                    <CCard text-color="white" class="text-center py-3 d-md-down-none bg-gradient-dark" body-wrapper>
                        <CCardBody>
                            <div class="text-center">
                                <img src="@/assets/img/dpic-logo.svg" block class="mb-2" width="130" />
                            </div>
                            <!-- <h2>Sign up</h2> -->
                            <p>
                                Dirección de Postgrado e Investigación
                                Científica
                                <span class="text-secondary">Facultad Nacional de Ingeniería</span>
                            </p>
                            <small class="text-secondary">©{{ year }} DPIC-FNI</small>
                            <!-- <CButton color="light" variant="outline" size="lg">
                                Register Now!
                            </CButton> -->
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        </CRow>
    </CContainer>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
    name: 'Login',
    data() {
        var d = new Date()
        var n = d.getFullYear()
        return {
            year: n,
            form: {
                email: 'admin@admin.com',
                password: 'admin',
            },

            submitted: false,
            isLoading: false
        }
    },

    methods: {
        ...mapActions({
            signIn: 'auth/signIn',
            seterror: 'auth/errorAction'
        }),
        handleSubmit() {
            if (navigator.onLine) {
                
                    this.submitted = true
                    this.signIn(this.form).then(() => {
                        
                        this.$router.replace({
                            name: 'inicio'
                        })
                        this.submitted = false
                    }).catch(err => {
                        this.submitted = false
                        if (err.response) {
                            this.seterror(err.response.data.error)
                        } else {
                            this.seterror("No se puede conectar al servidor")
                        }
                    })
                
            } else {
                this.seterror("No se puede conectar a Internet.")
            }
        }
    },
    computed: {
        ...mapGetters({
            error: 'auth/error'
        })
    },
}
</script>
