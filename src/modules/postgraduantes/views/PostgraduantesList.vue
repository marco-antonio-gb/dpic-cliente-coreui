<template>
<div>
    <div class="d-flex justify-content-between align-items-center p-1 pb-3">
        <h3 class="p-0 m-0 font-weight-bold">
            <CIcon name="cil-justify-center" /> {{$route.meta.title}}</h3>
        <button class="btn btn-primary" @click="$router.push({path:'/postgraduantes/add'})"> Nuevo postgraduante</button>
    </div>
    <CCard>
        <!-- <CCardHeader>
            <span class="badge badge-secondary">{{total}}</span> Registros en total
            <div class="card-header-actions">
            
                <CButtonGroup>
                    <CButton color="light" size="sm">
                        PDF
                    </CButton>
                    <CButton color="light" size="sm">
                        Excel
                    </CButton>
                </CButtonGroup>
            </div>
        </CCardHeader> -->
        <CCardBody class="card-body-custom ">
            <CDataTable :items="postgraduantes" :fields="fields" :tableFilter='{ placeholder : "Buscar registros", label : "Bucar" }' :items-per-page-select='{label:"Items por pagina"}' :items-per-page="5" sorter pagination :loading='isLoading' hover size="sm">
                <template #full_name="{item}">
                    <td>
                        <router-link class="custom-link" :to="{ name: 'postgraduante-detail', params: { idPostgraduante: item.idPostgraduante }}" v-slot="{ href,navigate }" custom>
                            <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                <CIcon name="cilLink" size="sm"></CIcon>
                                {{item.full_name}}
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
                            <CButton color="light" size="sm" @click="$router.push({path:'/postgraduantes/update/'+item.idPostgraduante})">
                                <CIcon name="cil-pencil"></CIcon>
                            </CButton>
                            <CButton color="secondary" size="sm" @click="$router.push({path:'/postgraduantes/detail/'+item.idPostgraduante})">
                                <CIcon name="cil-user"></CIcon>
                            </CButton>
                            <CButton color="dark" size="sm" @click="handleClick(item.idPostgraduante)">
                                <CIcon name="cil-trash"></CIcon>
                            </CButton>
                            
                        </CButtonGroup>
                        <!-- <router-link :to="`/postgraduantes/detail/${item.idPostgraduante}`" class="mr-2">
                            <CIcon name="cil-user"></CIcon>
                        </router-link>
                        <router-link :to="`/postgraduantes/update/${item.idPostgraduante}`" class="mr-2">
                            <CIcon name="cil-pencil"></CIcon>
                        </router-link>
                        <router-link :to="`/postgraduantes/update/${item.idPostgraduante}`" class="mr-2">
                            <CIcon name="cil-trash"></CIcon>
                        </router-link> -->
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
  
    </CCard>
    <ToastProps :show_toast='show_toast' :color_toast='color_toast' :message_toast='message_toast' />

</div>
</template>

<script>
import PostgraduanteService from '../services/PostgraduanteService'
import ToastProps from '@/components/ShowToast'
import CustomPostgraduante from '../services/CustomPostgraduante'

const fields = [{
        label: 'Nombre completo',
        key: 'full_name',
    },
    {
        label: 'C.I.',
        key: 'cedula'
    },
    {
        label: 'Celular',
        key: 'celular'
    },
    {
        label: 'Profesion',
        key: 'profesion'
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
    name: 'postgrados-list',
    data() {
        return {
            postgraduantes: [],
           
            isLoading: false,
            fields,
            validator_toast: '',
            message_toast: '',
            show_toast: false,
            color_toast: '',
            total: ''
        }
    },
    created() {
        this.PostgraduanteIndex()
    },
    mixins: [
        PostgraduanteService,
        CustomPostgraduante
    ],
    components: {
        ToastProps
    },
}
</script>
