import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
const Login = () =>
	import(/* webpackChunkName: "Login" */ "@/views/pages/Login");
// Containers
const TheContainer = () =>
	import(/* webpackChunkName: "TheContainer" */ "@/containers/TheContainer");
// Unauthorized
const Unauthorized = () =>
	import(/* webpackChunkName: "Unauthorized" */ "@/components/Unauthorized");
const PageNotFound = () =>
	import(/* webpackChunkName: "PageNotFound"  */ "@/components/PageNotFound");
//Modules
const UsuariosContainer = () =>
	import(/* webpackChunkName: "Usuarios" */ "@/modules/usuarios/Usuarios");
const UsuarioAdd = () =>
	import(/* webpackChunkName: "UsuarioAdd" */ "@/modules/usuarios/views/UsuarioAdd");
const UsuarioDetail = () =>
	import(/* webpackChunkName: "UsuarioDetail" */ "@/modules/usuarios/views/UsuarioDetail");
const UsuarioList = () =>
	import(/* webpackChunkName: "UsuarioList" */ "@/modules/usuarios/views/UsuarioList");
const UsuarioUpdate = () =>
	import(/* webpackChunkName: "UsuarioUpdate" */ "@/modules/usuarios/views/UsuarioUpdate");
//views
const Dashboard = () =>
	import(/* webpackChunkName: "Dashboard" */ "@/views/Black");
//potgraduantes
const Postgraduantes = () =>
	import(/* webpackChunkName: "Postgraduantes" */ "@/modules/postgraduantes/Postgraduantes");
const PostgraduantesAdd = () =>
	import(/* webpackChunkName: "PostgraduantesAdd" */ "@/modules/postgraduantes/views/PostgraduantesAdd");
const PostgraduantesDetail = () =>
	import(/* webpackChunkName: "PostgraduantesDetail" */ "@/modules/postgraduantes/views/PostgraduantesDetail");
const PostgraduantesList = () =>
	import(/* webpackChunkName: "PostgraduantesList" */ "@/modules/postgraduantes/views/PostgraduantesList");
const PostgraduantesUpdate = () =>
	import(/* webpackChunkName: "PostgraduantesUpdate" */ "@/modules/postgraduantes/views/PostgraduantesUpdate");

//potgrados
const Postgrados = () =>
	import(/* webpackChunkName: "Postgrados" */ "@/modules/postgrados/Postgrados");
const PostgradosAdd = () =>
	import(/* webpackChunkName: "PostgradoAdd" */ "@/modules/postgrados/views/PostgradoAdd");
const PostgradosDetail = () =>
	import(/* webpackChunkName: "PostgradoDetail" */ "@/modules/postgrados/views/PostgradoDetail");
const PostgradosMaterias = () =>
	import(/* webpackChunkName: "PostgradosMaterias" */ "@/modules/postgrados/components/Detalles/PostgradoRegistrarMaterias");
const PostgradoPostgraduanteNuevo = () =>
	import(/* webpackChunkName: "PostgradoPostgraduanteNuevo" */ "@/modules/postgrados/components/PostgradoPostgraduanteNuevo");

const PostgraduantesInscritos = () =>
	import(/* webpackChunkName: "PostgraduantesInscritos" */ "@/modules/postgrados/components/Detalles/PostgraduantesInscritos");
const PostgraduanteCalificaciones = () =>
	import(/* webpackChunkName: "PostgraduanteCalificaciones" */ "@/modules/postgrados/components/Detalles/PostgraduanteCalificaciones");
const EditarCalificacionPostgraduante = () =>
	import(/* webpackChunkName: "EditarCalificacionPostgraduante" */ "@/modules/postgrados/components/Detalles/EditarCalificacionPostgraduante");

const MateriasRegistradas = () =>
	import(/* webpackChunkName: "MateriasRegistradas" */ "@/modules/postgrados/components/Detalles/MateriasRegistradas");
const PagosRegistrados = () =>
	import(/* webpackChunkName: "PagosRegistrados" */ "@/modules/postgrados/components/Detalles/PagosRegistrados");
const PostgradoCalificaciones = () =>
	import(/* webpackChunkName: "PostgradoCalificaciones" */ "@/modules/postgrados/components/Detalles/PostgradoCalificaciones");
const RegistrarPagoPostgraduante = () =>
	import(/* webpackChunkName: "RegistrarPagoPostgraduante" */ "@/modules/postgrados/components/Detalles/RegistrarPagoPostgraduante");

const PostgradosList = () =>
	import(/* webpackChunkName: "PostgradoList" */ "@/modules/postgrados/views/PostgradoList");
const PostgradosUpdate = () =>
	import(/* webpackChunkName: "PostgradoUpdate" */ "@/modules/postgrados/views/PostgradoUpdate");

/* DETALLE PAGOS POSTGRADUANTE + REPORTE */
const DetallePagosInscritos = () =>
	import(/* webpackChunkName: "DetallePagosInscritos" */ "@/modules/postgrados/components/Detalles/DetallePagosInscritos");

const EditarDetallePagos = () =>
	import(/* webpackChunkName: "EditarDetallePagos" */ "@/modules/postgrados/components/Detalles/EditarDetallePagos");

//docentes
const Docentes = () =>
	import(/* webpackChunkName: "Docentes" */ "@/modules/docentes/Docentes");
const DocentesAdd = () =>
	import(/* webpackChunkName: "DocenteAdd" */ "@/modules/docentes/views/DocenteAdd");
const DocentesDetail = () =>
	import(/* webpackChunkName: "DocenteDetail" */ "@/modules/docentes/views/DocenteDetail");
const DocentesList = () =>
	import(/* webpackChunkName: "DocenteList" */ "@/modules/docentes/views/DocenteList");
const DocentesUpdate = () =>
	import(/* webpackChunkName: "DocenteUpdate" */ "@/modules/docentes/views/DocenteUpdate");

//pagos
const Materias = () =>
	import(/* webpackChunkName: "Materias" */ "@/modules/materias/Materias");
const MateriasAdd = () =>
	import(/* webpackChunkName: "MateriaAdd" */ "@/modules/materias/views/MateriaAdd");
const MateriasDetail = () =>
	import(/* webpackChunkName: "MateriaDetail" */ "@/modules/materias/views/MateriaDetail");
const MateriasList = () =>
	import(/* webpackChunkName: "MateriaList" */ "@/modules/materias/views/MateriaList");
const MateriasUpdate = () =>
	import(/* webpackChunkName: "MateriaUpdate" */ "@/modules/materias/views/MateriaUpdate");
//inscripciones
const Inscripciones = () =>
	import(/* webpackChunkName: "Inscripciones" */ "@/modules/inscripciones/Inscripciones");
const InscripcionList = () =>
	import(/* webpackChunkName: "InscripcionList" */ "@/modules/inscripciones/views/InscripcionList");
const InscripcionUpdate = () =>
	import(/* webpackChunkName: "InscripcionUpdate" */ "@/modules/inscripciones/views/InscripcionUpdate");
const InscripcionAdd = () =>
	import(/* webpackChunkName: "InscripcionAdd" */ "@/modules/inscripciones/views/InscripcionAdd");
const InscripcionDetail = () =>
	import(/* webpackChunkName: "InscripcionDetail" */ "@/modules/inscripciones/views/InscripcionDetail");
//PERMISOS
const Permisos = () =>
	import(/* webpackChunkName: "Permisos" */ "@/modules/permisos/Permisos");
const PermisoList = () =>
	import(/* webpackChunkName: "PermisoList" */ "@/modules/permisos/views/PermisoList");
const PermisoUpdate = () =>
	import(/* webpackChunkName: "PermisoUpdate" */ "@/modules/permisos/views/PermisoUpdate");
const PermisoAdd = () =>
	import(/* webpackChunkName: "PermisoAdd" */ "@/modules/permisos/views/PermisoAdd");
//PERMISOS
const Roles = () =>
	import(/* webpackChunkName: "Roles" */ "@/modules/roles/Roles");
const RolList = () =>
	import(/* webpackChunkName: "RolList" */ "@/modules/roles/views/RolList");
const RolUpdate = () =>
	import(/* webpackChunkName: "RolUpdate" */ "@/modules/roles/views/RolUpdate");
const RolAdd = () =>
	import(/* webpackChunkName: "RolAdd" */ "@/modules/roles/views/RolAdd");
const RolDetail = () =>
	import(/* webpackChunkName: "RolDetail" */ "@/modules/roles/views/RolDetail");
Vue.use(Router);
export const router = new Router({
	mode: "history", // https://router.vuejs.org/api/#mode
	linkActiveClass: "active",
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login,
			meta: {
				title: "Inicio de sesion"
			}
		},
		{
			path: "/",
			component: TheContainer,
			beforeEnter: (to, from, next) => {
				if (!store.getters["auth/authenticated"]) {
					return next({
						name: "login"
					});
				}
				next();
			},
			children: [
				{
					path: "/",
					name: "inicio",
					component: Dashboard,
					meta: {
						title: "Inicio",
						description: "Pagina Principal",
						requiresAuth: true
					}
				},
				{
					path: "/usuarios",
					component: UsuariosContainer,
					children: [
						{
							path: "",
							name: "Usuarios",
							component: UsuarioList,
							meta: {
								title: "Lista de usuarios",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/usuarios/add",
							name: "usuarios-add",
							component: UsuarioAdd,
							meta: {
								title: "Agregar usuario",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/usuarios/detail/:idUsuario",
							name: "usuarios-detail",
							component: UsuarioDetail,
							meta: {
								title: "Detalle usuario",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/usuarios/update/:idUsuario",
							name: "usuarios-update",
							component: UsuarioUpdate,
							meta: {
								title: "Editar de usuarios",
								permissions: ["Sistemas", "Administrador"]
							}
						}
					]
				},
				{
					path: "/postgraduantes",
					component: Postgraduantes,
					children: [
						{
							path: "",
							name: "postgraduantes-list",
							component: PostgraduantesList,
							meta: {
								title: "Lista postgraduantes registrados",
								permissions: [
									"Sistemas",
									"Administrador",
									"Docente"
								]
							}
						},
						{
							path: "/postgraduantes/add",
							name: "postgraduantes-add",
							component: PostgraduantesAdd,
							meta: {
								title: "Registrar nuevo postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/postgraduantes/detail/:idPostgraduante",
							name: "postgraduantes-detail",
							component: PostgraduantesDetail,
							meta: {
								title: "Detalle postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/postgraduantes/update/:idPostgraduante",
							name: "postgraduantes-update",
							component: PostgraduantesUpdate,
							meta: {
								title: "Editar informacion de postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						}
					]
				},
				{
					path: "/postgrados",
					component: Postgrados,
					children: [
						{
							path: "",
							name: "postgrados-list",
							component: PostgradosList,
							meta: {
								title: "Lista postgrados registrados",
								permissions: [
									"Sistemas",
									"Administrador",
									"Docente"
								]
							}
						},
						{
							path: "/postgrados/add",
							name: "postgrados-add",
							component: PostgradosAdd,
							meta: {
								title: "Registrar curso de postgrado",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/postgrados/detail/:idPostgrado",
							name: "postgrados-detail",
							component: PostgradosDetail,
							meta: {
								title: "Detalle postgrado",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// LISTA DE POSTGRADUANTES INSCRITOS AL CURSO DE POSTGRADO
						{
							path:
								"/postgrados/detail/:idPostgrado/postgraduantes",
							name: "postgraduantes-inscritos",
							component: PostgraduantesInscritos,
							meta: {
								title: "Postgraduantes inscritos",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// CALIFICACIONES (TODAS LAS MATERIAS) DEL POSTGRADUANTE REGISTRADO
						{
							path:
								"/postgrados/detail/:idPostgrado/postgraduantes/calificaciones-postgraduante/:idPostgraduante",
							name: "calificaciones-postgraduante",
							component: PostgraduanteCalificaciones,
							meta: {
								title: "Detalle Calificaciones postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// EDITAR CALIFICACION (MATERIA) DEL POSTGRADUANTE REGISTRADO
						{
							path:
								"/postgrados/detail/:idPostgrado/postgraduantes/calificaciones-postgraduante/:idPostgraduante/editar-calificacion/:idCalificacion",
							name: "editar-calificaciones-postgraduante",
							component: EditarCalificacionPostgraduante,
							meta: {
								title: "Editar Calificacion postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// LISTA DE MATERIAS REGISTRADAS EN EL  CURSO DE POSTGRADO
						{
							path: "/postgrados/detail/:idPostgrado/materias",
							name: "materias-postgrado",
							component: MateriasRegistradas,
							meta: {
								title: "Materias registradas",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// REGISTRAR CALIFICACION EN UNA MATERIA DEL CURSO
						{
							path:
								"/postgrados/detail/:idPostgrado/materias/registrar-calificacion/materia/:idMateria/docente/:idDocente",
							name: "postgrado-registro-calificaciones",
							component: PostgradoCalificaciones,
							meta: {
								title: "Registrar calificaciones Materia",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// LISTA DE MATERIAS REGISTRADAS EN EL  CURSO DE POSTGRADO
						{
							path: "/postgrados/detail/:idPostgrado/pagos",
							name: "pagos-postgrado",
							component: PagosRegistrados,
							meta: {
								title: "Pagos registrados",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						/* DETALLE PAGOS INSCRITOS */
						{
							path:
								"/postgrados/detalle-pagos/:idPostgrado/postgraduante/:idPostgraduante",
							name: "postgrado-postgraduante-pagos",
							component: DetallePagosInscritos,
							meta: {
								title: "Detalle pagos postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						/* REGISTRar PAGOS INSCRITOS */
						{
							path:
								"/postgrados/detail/:idPostgrado/pagos/registrar-pago-postgraduante/:idPostgraduante",
							name: "registrar-pagos-postgraduante",
							component: RegistrarPagoPostgraduante,
							meta: {
								title: "Registrar pagos postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path:
								"/postgrados/editar-pagos/:idPostgrado/postgraduante/:idPostgraduante/pago/:idPago",
							name: "editar-pagos-postgraduante",
							component: EditarDetallePagos,
							meta: {
								title: "Editar pago postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						// ----------------------------------------------------------
						{
							path: "/postgrados/update/:idPostgrado",
							name: "postgrados-update",
							component: PostgradosUpdate,
							meta: {
								title: "Editar informacion de postgrado",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path:
								"/postgrados/detail/:idPostgrado/registrar-materia",
							name: "postgrados-materias",
							component: PostgradosMaterias,
							meta: {
								title: "Asignar materia a postgrado",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path:
								"/postgrados/detail/:idPostgrado/registrar-postgraduante/:opcionPostgraduante",
							name: "postgrado-postgraduante-nuevo",
							component: PostgradoPostgraduanteNuevo,
							meta: {
								title: "Registrar Nuevo postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						}

						// {
						// 	path:
						// 		"/postgrados/registrar-calificacion/:idPostgrado/postgraduante/:idPostgraduante/asignatura/:idMateria/docente/:idDocente",
						// 	name: "postgrado-registro-calificaciones",
						// 	component: PostgradoCalificaciones,
						// 	meta: { title: "Registrar calificaciones Materia" }
						// }
					]
				},
				{
					path: "/docentes",
					component: Docentes,
					children: [
						{
							path: "",
							name: "docentes-list",
							component: DocentesList,
							meta: {
								title: "Lista docentes registrados",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/docentes/add",
							name: "docentes-add",
							component: DocentesAdd,
							meta: {
								title: "Registrar materia",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/docentes/detail/:idDocente",
							name: "docentes-detail",
							component: DocentesDetail,
							meta: {
								title: "Detalle postgraduante",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/docentes/update/:idDocente",
							name: "docentes-update",
							component: DocentesUpdate,
							meta: {
								title: "Editar informacion de la materia",
								permissions: ["Sistemas", "Administrador"]
							}
						}
					]
				},

				{
					path: "/materias",
					component: Materias,
					children: [
						{
							path: "",
							name: "materias-list",
							component: MateriasList,
							meta: {
								title: "Lista materias registrados",
								permissions: [
									"Sistemas",
									"Administrador",
									"Docente"
								]
							}
						},
						{
							path: "/materias/add",
							name: "materias-add",
							component: MateriasAdd,
							meta: {
								title: "Registrar nueva materia",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/materias/detail/:idMateria",
							name: "materias-detail",
							component: MateriasDetail,
							meta: {
								title: "Detalle materias",
								permissions: ["Sistemas", "Administrador"]
							}
						},
						{
							path: "/materias/update/:idMateria",
							name: "materias-update",
							component: MateriasUpdate,
							meta: {
								title: "Editar informacion de Materia",
								permissions: ["Sistemas", "Administrador"]
							}
						}
					]
				},
				{
					path: "/inscripciones",
					component: Inscripciones,
					children: [
						{
							path: "",
							name: "inscripcion-list",
							component: InscripcionList,
							meta: { title: "Lista de inscripciones" }
						},
						{
							path: "/inscripciones/add",
							name: "inscripciones-add",
							component: InscripcionAdd,
							meta: {
								title: "Formulario de inscripcion"
							}
						},
						{
							path: "/inscripciones/detail/:idInscripcion",
							name: "inscripciones-detail",
							component: InscripcionDetail,
							meta: { title: "Detalle inscripciones" }
						},
						{
							path: "/inscripciones/update/:idInscripcion",
							name: "inscripciones-update",
							component: InscripcionUpdate,
							meta: {
								title: "Editar informacion de la inscripcion"
							}
						}
					]
				},
				{
					path: "/permisos",
					component: Permisos,
					children: [
						{
							path: "",
							name: "permiso-list",
							component: PermisoList,
							meta: {
								title: "Lista de permisos",
								permissions: ["Sistemas"]
							}
						},
						{
							path: "/permisos/add",
							name: "permiso-add",
							component: PermisoAdd,
							meta: {
								title: "Crear nuevo permiso",
								permissions: ["Sistemas"]
							}
						},
						{
							path: "/permisos/update/:idPermiso",
							name: "permiso-update",
							component: PermisoUpdate,
							meta: {
								title: "Editar informacion del permiso",
								permissions: ["Sistemas"]
							}
						}
					]
				},
				{
					path: "/roles",
					component: Roles,
					children: [
						{
							path: "",
							name: "rol-list",
							component: RolList,
							meta: {
								title: "Lista de roles",
								permissions: ["Sistemas"]
							}
						},
						{
							path: "/roles/add",
							name: "rol-add",
							component: RolAdd,
							meta: {
								title: "Crear nuevo rol",
								permissions: ["Sistemas"]
							}
						},
						{
							path: "/roles/detail/:idRol",
							name: "rol-detail",
							component: RolDetail,
							meta: {
								title: "Detalle informacion del rol",
								permissions: ["Sistemas"]
							}
						},
						{
							path: "/roles/update/:idRol",
							name: "rol-update",
							component: RolUpdate,
							meta: {
								title: "Editar informacion del rol",
								permissions: ["Sistemas"]
							}
						}
					]
				}
			]
		},
		{
			path: "/unauthorized",
			name: "acceso-denegado",
			component: Unauthorized,
			meta: {
				title: "Error 403"
			}
		},
		{
			path: "*",
			component: PageNotFound,
			meta: {
				title: "Error 404"
			}
		}
	]
});
router.beforeEach((to, from, next) => {
	var userPermissions = store.getters["auth/roles"];
	// console.log(userPermissions);
	document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
	if (to.meta.permissions && to.meta.permissions.length > 0) {
		let isAllowed = userPermissions.some(p =>
			to.meta.permissions.includes(p.name)
		);

		if (!isAllowed) return next("/unauthorized");
	}
	next();
});
