<template>
<div>
    <goback class="mb-3"/>
    <form @submit.prevent="MateriaUpdate($route.params.idMateria)" >
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
                            <option v-for="postgrado in postgrados" :key="postgrado.id" v-bind:value="materia.postgrado_id">
                                {{ postgrado.nombre }}
                            </option>
                        </select>
                    </div>
                </CCol>
 
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
        <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />

    <pre>{{materia}}</pre>
</div>
</template>

<script>
import MateriaService from '../services/MateriaService'
import CustomServiceMateria from '../services/CustomServiceMateria'
import ToastProps from '@/components/ShowToast'

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
    components:{
        ToastProps
    },
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
        this.PostgradoIndex()
        this.MateriaShow(this.$route.params.idMateria);
        
    },
    
}
</script>
