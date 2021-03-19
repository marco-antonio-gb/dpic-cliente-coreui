<template>
<div>
    <goback class="mb-3" />
    <form @submit.prevent="RolStore">
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="6">
                    <CInput label="Nombre" required placeholder="Nombre del materia" v-model="rol.name" />
                </CCol>
                <CCol sm="6">
                    <CInput label="Descripcion" placeholder="Descripcion " v-model="rol.descripcion" />
                </CCol>
            </CRow>
            <CRow>
            </CRow>
            <label class="typo__label">Tagging</label>
            <multiselect v-model="rol.permisos" tag-placeholder="Add this as new tag" placeholder="Seleccione un permiso" label="name" track-by="name" :options="load_permisos" :multiple="true" :taggable="true" :close-on-select="false" :clear-on-select="false"></multiselect>
            <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
            <!-- <table>
                <tr>
                    <th>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="selectAll">
                            <label class="form-check-label" for="exampleCheck1">Seleccionar todos</label>
                        </div>
                    </th>
                </tr>
                <tr v-for="user in load_permisos" :key="user.id">
                    <td>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="rol.permisos" :value="user.id" number>
                            <label class="form-check-label" for="exampleCheck1"> <strong>{{user.name}}</strong></label>
                        </div>
                    </td>
                    <td></td>
                </tr>
            </table> -->

        </CCard>

        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarRolAdd">Cancelar</button>
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
import RolService from '../services/RolService'
import ToastProps from '@/components/ShowToast'
import Multiselect from 'vue-multiselect'

export default {
    data() {
        return {
            isLoading: false,
            rol: {
                name: '',
                guard_name: 'api',
                descripcion: '',
                permisos: []
            },
            load_permisos: [],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
            selected: [],
            value: [],
            options: [{
                    name: 'Vue.js',
                    language: 'JavaScript'
                },
                {
                    name: 'Adonis',
                    language: 'JavaScript'
                },
                {
                    name: 'Rails',
                    language: 'Ruby'
                },
                {
                    name: 'Sinatra',
                    language: 'Ruby'
                },
                {
                    name: 'Laravel',
                    language: 'PHP'
                },
                {
                    name: 'Phoenix',
                    language: 'Elixir'
                }
            ]

        }
    },
    created() {
        this.getPermisos()
    },
    mixins: [
        RolService,
    ],
    components: {
        ToastProps,
        Multiselect
    },
    methods: {
        getPermisos() {
            axios.get("/permisos").then(reponse => {
                this.load_permisos = reponse.data.data
            }).catch(error => {
                console.log(error)
            })
        }
    },
    computed: {
        selectAll: {
            get: function () {
                return this.load_permisos ? this.rol.permisos.length == this.load_permisos.length : false;
            },
            set: function (value) {
                var selected = [];

                if (value) {
                    this.load_permisos.forEach(function (user) {
                        selected.push(user.id);
                    });
                }

                this.rol.permisos = selected;
            }
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
