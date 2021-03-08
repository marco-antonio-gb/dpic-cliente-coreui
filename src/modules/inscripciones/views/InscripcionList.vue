<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/inscripciones/add'})"> Nueva inscripcion</button>
    </div>
    <CCard>
        <CCardHeader>
            <div class="d-flex justify-content-between align-items-center">
                <div class="card-title m-0"><strong>{{total}}</strong> items en total</div>
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
            <CDataTable :items="inscripciones" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover size="sm">
                <template #full_name="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'postgraduantes-detail', params: { idPostgraduante: item.idPostgraduante }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                <CIcon name="cilLink" size="sm"></CIcon>
                                {{item.full_name}}
                            </a>
                        </router-link>
                    </td>
                </template>
                <template #nombre="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'postgrados-detail', params: { idPostgrado: item.idPostgrado }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                <CIcon name="cilLink" size="sm"></CIcon>
                                {{item.gestion}} - {{item.nombre}}
                            </a>
                        </router-link>
                    </td>
                </template>
                <template #ci="{item}">
                    <td>
                        {{item.ci}} ({{item.ci_ext}})
                    </td>
                </template>
                <template #opciones="{item }">
                    <td class="py-2">
                        <router-link :to="`/inscripciones/detail/${item.idInscripcion}`" class="mr-2">
                            <CIcon name="cil-user"></CIcon>
                        </router-link>
                        <router-link :to="`/inscripciones/update/${item.idInscripcion}`" class="mr-2">
                            <CIcon name="cil-pencil"></CIcon>
                        </router-link>
                        <router-link :to="`/inscripciones/update/${item.idInscripcion}`" class="mr-2">
                            <CIcon name="cil-trash"></CIcon>
                        </router-link>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>

    </CCard>
    <!-- <pre>{{inscripciones}}</pre> -->
</div>
</template>

<script>
import InscripcionService from '../services/InscripcionService'
const fields = [{
        label: 'Postgraduante',
        key: 'full_name',
    },
    {
        label: 'CI',
        key: 'ci'
    },
    {
        label: 'Postgrado',
        key: 'nombre'
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
            total: '',
            inscripciones: [],
            isLoading: false,
            fields,
            fixedToasts: 0,
        }
    },
    created() {
        this.InscripcionIndex()
    },
    mixins: [
        InscripcionService
    ]
}
</script>

<style>
</style>
