<template>
<div>
    <div class="d-flex align-items-center  ">
        <div class="mr-auto">
           <goback/>
        </div>
        <div class="">
            <CDropdown color="secondary" toggler-text="Opciones" class="m-2">
                <CDropdownItem>Generar Historial Academico</CDropdownItem>
                <CDropdownItem>Reporte de pagos</CDropdownItem>
                <CDropdownItem>Third Action</CDropdownItem>
                <CDropdownDivider></CDropdownDivider>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdown>
        </div>
        <div class=""><button class="btn btn-success" @click="$router.push({path:'/postgraduantes/update/'+$route.params.idPostgraduante})"> Editar postgraduante</button></div>

    </div>
    <p class="font-weight-bold">Informacion personal</p>
    <CCard>
        <CCardBody>
            <div class="d-flex align-items-center">
                <div class="mr-auto ">
                    <h4>{{postgraduante.paterno}} {{postgraduante.materno}} {{postgraduante.nombres}} <span class="font-weight-normal">- {{postgraduante.ci}} ({{postgraduante.ci_ext}})</span> </h4>
                </div>
                <div class="">
                    <h6 class="mr-3"># Celular: <strong>{{postgraduante.celular}}</strong> </h6>
                </div>
                <div class="">
                    <h6>Email: <strong>{{postgraduante.correo}} </strong></h6>
                </div>
            </div>
            <hr>
            <CRow>
                <CCol sm="3">
                    <p class="mr-3">Fecha Nacimiento: <strong>{{postgraduante.fecha_nac}}</strong> </p>
                    <span class="mr-3">Lugar Nacimiento: <strong>{{postgraduante.lugar_nac}}</strong> </span>

                </CCol>
                <CCol sm="4">
                    <p class="mr-3">Profesion: <strong>{{postgraduante.profesion}}</strong> </p>
                    <p class="mr-3">Lugar Trabajo: <strong>{{postgraduante.lugar_trabajo}}</strong> </p>
                    <span>Telf. Trabajo: <strong>{{postgraduante.telf_trabajo}}</strong> </span>
                </CCol>
                <CCol sm="5">
                    <p class="mr-3">Direccion: <strong>{{postgraduante.direc_domicilio}} #{{postgraduante.nro_domicilio}}</strong> </p>
                    <p class="mr-3">Telefono Fijo: <strong>{{postgraduante.telf_domicilio}}</strong> </p>
                    <p>Telf. Trabajo: <strong>{{postgraduante.telf_trabajo}}</strong> </p>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="7">
                    <span class="mr-3">Observaciones: <strong>{{postgraduante.observaciones}}</strong> </span>

                </CCol>
                <CCol sm="4">
                    <span class="mr-3 text-muted">Fecha registro: <strong>{{postgraduante.fecha_inscripcion}}</strong> </span>

                </CCol>

            </CRow>

            <!-- <CListGroup>
                <p class="text-muted">Materias: </p>
                <CListGroupItem href="javascript:void(0)"  @click="$router.push({path:'/materias/detail/'+materia.idMateria})">
                    <div class="d-flex">
                        <div class=""></div>
                        <div class=""> </div>
                        <div class="mr-auto "></div>
                    </div>
                </CListGroupItem>
            </CListGroup> -->
        </CCardBody>
    </CCard>
    <p class="font-weight-bold p-0">Cursos de postgrados</p>
    <CCard>
        <table class="table table-hover table-sm mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Sigla</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Credito</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(materia,index) in postgraduante.materias" :key="materia.id">
                    <th scope="row">{{index+1}}</th>
                    <td><strong> {{materia.sigla}} </strong></td>
                    <td>
                        <a href="javascript:void(0)" @click="$router.push({path:'/materias/detail/'+materia.idMateria})">{{materia.nombre}}</a>
                    </td>
                    <td>{{materia.credito}}</td>
                </tr>
            </tbody>
        </table>
    </CCard>
    <!-- <pre>{{postgraduante}}</pre> -->
</div>
</template>

<script>
import PostgraduanteService from '../services/PostgraduanteService'
export default {
    data() {
        return {
            postgraduante: {}
        }
    },
    created() {
        this.PostgraduanteShow(this.$route.params.idPostgraduante);
    },
    mixins: [
        PostgraduanteService
    ],
    methods: {}
}
</script>
