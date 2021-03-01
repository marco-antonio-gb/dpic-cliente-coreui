<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/materias/add'})"> Nueva Materia</button>
    </div>
    <CCard>
        <CCardHeader>
             <span class="badge badge-secondary">{{total}}</span>  Registros en total
            <div class="card-header-actions">
                <span class="text-muted">Exportar: </span>
                <CButtonGroup>
                    <CButton color="light" size="sm">
                        PDF
                    </CButton>
                    <CButton color="light" size="sm">
                        Excel
                    </CButton>
                </CButtonGroup>
            </div>
        </CCardHeader>
        <CCardBody class="card-body-custom ">
            <CDataTable :items="materias" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover  size="sm">
                <template #nombre="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'materias-detail', params: { idMateria: item.idMateria }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                <CIcon name="cilLink" size="sm"></CIcon>
                                {{item.nombre}}
                            </a>
                        </router-link>
                    </td>
                </template>
                <template #activo="{item}">
                    <td>
                        <CBadge :color="getBadge(item.activo)">
                            {{getLable(item.activo)}}
                        </CBadge>
                    </td>
                </template>
                <template #opciones="{item }">
                    <td class="py-2">
                        <CButtonGroup>
                            <CButton color="light" size="sm" @click="$router.push({path:'/postgrados/detail/'+item.idMateria})">
                                <CIcon name="cil-user"></CIcon>
                            </CButton>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/postgrados/update/'+item.idMateria})">
                                <CIcon name="cil-pencil"></CIcon>
                            </CButton>
                            <CButton color="dark" size="sm"  >
                                <CIcon name="cil-trash"></CIcon>
                            </CButton>
                        </CButtonGroup>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
        
    </CCard>
</div>
</template>

<script>
 
import MateriaService from '../services/MateriaService'
const fields = [
    {
        label: 'Sigla',
        key: 'sigla'
    },
    {
        label: 'Postgrado',
        key: 'nombre',
    },
    
    {
        label: 'Credito',
        key: 'credito'
    },
     
    {
        key: 'opciones',
        label: 'Opciones',
        _style: 'width:1%',
        sorter: false,
        filter: false
    }
]
export default {
    data() {
        return {
            materias: [],
            isLoading: false,
            total: '0',
            fields,
           postgrados:[]

        }
    },
    created() {
        this.MateriaIndex()
        
    },
    mixins: [
        MateriaService,
        
    ]
}
</script>

<style>

</style>
