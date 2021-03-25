<template>
<div>
 
    <CCard v-if="docentes.length>0">
        <CCardHeader>
            <strong>Docentes / Asignaturas</strong>
        </CCardHeader>
        <CCardBody class="p-1">
            <table class="table table-hover ">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <!-- <th scope="col">Nombre docente</th> -->
                        <th scope="col">Materia/Modulo</th>
                        <th scope="col">Credito</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(docente,index) in docentes" :key="docente.id">
                        <td class="text-center"><strong>{{index+1}}</strong></td>
                        <td>
                            <router-link class="custom-link  " :to="{ name: 'materias-detail', params: { idMateria: docente.idMateria}}" v-slot="{ href,navigate }" custom>
                                <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                    <!-- <CIcon name="cilLink" size="sm" class="text-dark icon-link"></CIcon> -->
                                    <strong>{{docente.sigla}}</strong> - {{docente.nombre}}
                                </a>
                            </router-link> <br>
                            <small>
                                <router-link class="custom-link  " :to="{ name: 'usuarios-detail', params: { idUsuario: docente.idUsuario}}" v-slot="{ href,navigate }" custom>
                                    <a :href="href" @click="navigate" role="link" @keypress.enter="navigate">
                                        Docente:
                                        {{docente.full_name}}
                                    </a>
                                </router-link>
                            </small>
                        </td>
                        <td>{{docente.credito}}</td>
                        <!-- /postgrados/registrar-calificacion/:idPostgrado/postgraduante/:idPostgraduante/asignatura/:idMateria/docente/:idDocente -->
                        <td>
                            <CButtonGroup>
                                <CButton color="light" size="sm" @click="$router.push({
                                    path:'/postgrados/registrar-calificacion/'
                                    +$route.params.idPostgrado                                    
                                    +'/asignatura/'
                                    +docente.idMateria
                                    +'/docente/'
                                    +docente.idUsuario
                                    })">
                                    <!-- <CIcon name="cil-pencil"></CIcon> -->
                                    Notas
                                </CButton>
                                <CButton color="light" size="sm" @click="$router.push({
                                    path:'/postgrados/registrar-calificacion/'
                                    +$route.params.idPostgrado                                    
                                    +'/asignatura/'
                                    +docente.idMateria
                                    +'/docente/'
                                    +docente.idUsuario
                                    })">
                                    <!-- <CIcon name="cil-list"></CIcon> -->
                                    Lista
                                </CButton>
                                <CButton color="secondary" size="sm" @click="reporteCalificacionesPostgrado($route.params.idPostgrado,docente.idMateria,docente.idUsuario,docente.nombre)">
                                    <CIcon name="cil-print"></CIcon>
                                </CButton>
                            </CButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CCardBody>
    </CCard>
    <CCard v-else>
        <CCardBody class="text-center">
            <span>No se registraron materias</span>
        </CCardBody>
    </CCard>
</div>
</template>

<script>
export default {
    props: {
        docentes: {
            type: Array,
            default: []
        },
    }
}
</script>

<style>
</style>
