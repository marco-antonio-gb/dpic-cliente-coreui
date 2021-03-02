<template>
<div>
    <goback  class="mb-3"/>
    <form @submit.prevent="MateriaStore" >
        <CCard bodyWrapper class="mb-2">
            <CRow>
                <CCol sm="6">
                    <CInput label="Nombre" required placeholder="Nombre del materia" v-model="materia.nombre" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Sigla" type="text"  placeholder="Sigla" required v-model="materia.sigla" />
                </CCol>
                <CCol sm="3">
                    <CInput label="Credito" placeholder="credito " v-model="materia.credito" />
                </CCol>
                
            </CRow>
            <CRow>
              <CCol sm="12">
                    <div class="form-group">
                        <label for="uid-l744h660att" class=""> Postgrados </label>
                        <select required id="dropDown" class="form-control" v-model="materia.postgrado_id">
                            <option value="">Seleccionar postgrado</option>
                            <option v-for="postgrado in postgrados" :key="postgrado.id" v-bind:value="postgrado.idPostgrado">
                                {{ postgrado.nombre }}
                            </option>
                        </select>
                    </div>
                </CCol>
              <!-- <CCol sm="8">
                    <CInput label="Descripcion" placeholder="Descripcion" type="text"   v-model="materia.descripcion" />
                </CCol>
                 -->
                
                
            </CRow>
        </CCard>
        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click.prevent="cancelarMateria">Cancelar</button>
            <CButton color="primary" class="px-4  " type="submit" :disabled="isLoading">
                <CSpinner color="warning" size="sm" v-if="isLoading" />
                <span v-if="isLoading">
                    Procesando...</span>
                <span v-else> Guardar informacion </span>
            </CButton>
        </div>
    </form>
    <CToaster position="bottom-right" :autohide="5000" v-if="show_toast">
        <CToast :show="show_toast" :header="`${$route.meta.title}`">
            {{message_toast}}
        </CToast>
    </CToaster>
</div>
</template>

<script>
import MateriaService from '../services/MateriaService'
import CustomServiceMateria from '../services/CustomServiceMateria'
export default {
    data() {
        return {
            isLoading: false,
            fixedToasts: 0,
            materia: {
                nombre: '',
                sigla: '',
                descripcion: '',
                credito: '',
                postgrado_id:''
                
            },
            niveles: [],
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
            postgrados:[]
        }
    },
    mixins: [
        MateriaService,
        CustomServiceMateria
    ],
    methods: {
        addFixedToast() {
            this.fixedToasts++
        },
        getNiveles() {
            axios.get("/niveles")
                .then(response => {
                    this.niveles = response.data.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    created() {
        this.getNiveles()
        this.PostgradoIndex()
        
    },
    watch: {
        show_toast() {
            return false
        }
    }
}
</script>
