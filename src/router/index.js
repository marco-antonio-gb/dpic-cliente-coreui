import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
const Login = () =>
	import(/* webpackChunkName: "Login" */ "@/views/pages/Login");
// Containers
const TheContainer = () =>
	import(/* webpackChunkName: "TheContainer" */ "@/containers/TheContainer");
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
	import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard");
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
	import(/* webpackChunkName: "PostgradosMaterias" */ "@/modules/postgrados/views/PostgradosMaterias");
const PostgradoPostgraduanteNuevo = () =>
	import(/* webpackChunkName: "PostgradoPostgraduanteNuevo" */ "@/modules/postgrados/components/PostgradoPostgraduanteNuevo");
const PostgradoPostgraduantePago = () =>
	import(/* webpackChunkName: "PostgradoPostgraduantePago" */ "@/modules/postgrados/components/PostgradoPostgraduantePago");
const PostgradoCalificaciones = () =>
	import(/* webpackChunkName: "PostgradoCalificaciones" */ "@/modules/postgrados/components/PostgradoCalificaciones");

const PostgradosList = () =>
	import(/* webpackChunkName: "PostgradoList" */ "@/modules/postgrados/views/PostgradoList");
const PostgradosUpdate = () =>
	import(/* webpackChunkName: "PostgradoUpdate" */ "@/modules/postgrados/views/PostgradoUpdate");
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
const Pagos = () =>
	import(/* webpackChunkName: "Pagos" */ "@/modules/pagos/Pagos");
const PagosAdd = () =>
	import(/* webpackChunkName: "PagoAdd" */ "@/modules/pagos/views/PagoAdd");
const PagosDetail = () =>
	import(/* webpackChunkName: "PagoDetail" */ "@/modules/pagos/views/PagoDetail");
const PagosList = () =>
	import(/* webpackChunkName: "PagoList" */ "@/modules/pagos/views/PagoList");
const PagosUpdate = () =>
	import(/* webpackChunkName: "PagoUpdate" */ "@/modules/pagos/views/PagoUpdate");
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
							meta: { title: "Lista de usuarios" }
						},
						{
							path: "/usuarios/add",
							name: "usuarios-add",
							component: UsuarioAdd,
							meta: { title: "Agregar usuario" }
						},
						{
							path: "/usuarios/detail/:idUsuario",
							name: "usuarios-detail",
							component: UsuarioDetail,
							meta: { title: "Detalle usuario" }
						},
						{
							path: "/usuarios/update/:idUsuario",
							name: "usuarios-update",
							component: UsuarioUpdate,
							meta: { title: "Editar de usuarios" }
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
							meta: { title: "Lista postgraduantes registrados" }
						},
						{
							path: "/postgraduantes/add",
							name: "postgraduantes-add",
							component: PostgraduantesAdd,
							meta: { title: "Registrar nuevo postgraduante" }
						},
						{
							path: "/postgraduantes/detail/:idPostgraduante",
							name: "postgraduantes-detail",
							component: PostgraduantesDetail,
							meta: { title: "Detalle postgraduante" }
						},
						{
							path: "/postgraduantes/update/:idPostgraduante",
							name: "postgraduantes-update",
							component: PostgraduantesUpdate,
							meta: {
								title: "Editar informacion de postgraduante"
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
							meta: { title: "Lista postgrados registrados" }
						},
						{
							path: "/postgrados/add",
							name: "postgrados-add",
							component: PostgradosAdd,
							meta: {
								title: "Registrar curso de postgrado"
							}
						},
						{
							path: "/postgrados/detail/:idPostgrado",
							name: "postgrados-detail",
							component: PostgradosDetail,
							meta: { title: "Detalle postgrado" }
						},

						{
							path: "/postgrados/update/:idPostgrado",
							name: "postgrados-update",
							component: PostgradosUpdate,
							meta: {
								title: "Editar informacion de postgrado"
							}
						},
						{
							path: "/postgrados/asignar-materias/:idPostgrado",
							name: "postgrados-materias",
							component: PostgradosMaterias,
							meta: { title: "Asignar materia a postgrado" }
						},
						{
							path:
								"/postgrados/inscribir-postgraduante-nuevo/:idPostgrado",
							name: "postgrado-postgraduante-nuevo",
							component: PostgradoPostgraduanteNuevo,
							meta: { title: "Inscribir Nuevo postgraduante" }
						},
						{
							path:
								"/postgrados/inscribir-postgraduante-existente/:idPostgrado",
							name: "postgrado-postgraduante-existente",
							component: PostgradoPostgraduanteNuevo,
							meta: { title: "Inscribir postgraduante existente" }
						},
						{
							path:
								"/postgrados/registrar-pago/:idPostgrado/postgraduante/:idPostgraduante",
							name: "postgrado-postgraduante-pagos",
							component: PostgradoPostgraduantePago,
							meta: { title: "Registrar pago postgrado" }
						},
						{
							path:
								"/postgrados/registrar-calificacion/:idPostgrado/asignatura/:idMateria/docente/:idDocente",
							name: "postgrado-registro-calificaciones",
							component: PostgradoCalificaciones,
							meta: { title: "Registrar calificaciones Materia" }
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
							meta: { title: "Lista docentes registrados" }
						},
						{
							path: "/docentes/add",
							name: "docentes-add",
							component: DocentesAdd,
							meta: {
								title: "Registrar materia"
							}
						},
						{
							path: "/docentes/detail/:idDocente",
							name: "docentes-detail",
							component: DocentesDetail,
							meta: { title: "Detalle postgraduante" }
						},
						{
							path: "/docentes/update/:idDocente",
							name: "docentes-update",
							component: DocentesUpdate,
							meta: {
								title: "Editar informacion de la materia"
							}
						}
					]
				},
				{
					path: "/pagos",
					component: Pagos,
					children: [
						{
							path: "",
							name: "pagos-list",
							component: PagosList,
							meta: { title: "Lista pagos registrados" }
						},
						{
							path: "/pagos/add",
							name: "pagos-add",
							component: PagosAdd,
							meta: {
								title: "Registrar nuevo pago"
							}
						},
						{
							path: "/pagos/detail/:idPago",
							name: "pagos-detail",
							component: PagosDetail,
							meta: { title: "Detalle pagos" }
						},
						{
							path: "/pagos/update/:idPago",
							name: "pagos-update",
							component: PagosUpdate,
							meta: {
								title: "Editar informacion de pago"
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
							meta: { title: "Lista materias registrados" }
						},
						{
							path: "/materias/add",
							name: "materias-add",
							component: MateriasAdd,
							meta: {
								title: "Registrar nueva materia"
							}
						},
						{
							path: "/materias/detail/:idMateria",
							name: "materias-detail",
							component: MateriasDetail,
							meta: { title: "Detalle materias" }
						},
						{
							path: "/materias/update/:idMateria",
							name: "materias-update",
							component: MateriasUpdate,
							meta: {
								title: "Editar informacion de Materia"
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
							meta: { title: "Lista de permisos" }
						},
						{
							path: "/permisos/add",
							name: "permiso-add",
							component: PermisoAdd,
							meta: {
								title: "Crear nuevo permiso"
							}
						},

						{
							path: "/permisos/update/:idPermiso",
							name: "permiso-update",
							component: PermisoUpdate,
							meta: {
								title: "Editar informacion del permiso"
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
							meta: { title: "Lista de roles" }
						},
						{
							path: "/roles/add",
							name: "rol-add",
							component: RolAdd,
							meta: {
								title: "Crear nuevo rol"
							}
						},

						{
							path: "/roles/detail/:idRol",
							name: "rol-detail",
							component: RolDetail,
							meta: {
								title: "Detalle informacion del rol"
							}
						},
						{
							path: "/roles/update/:idRol",
							name: "rol-update",
							component: RolUpdate,
							meta: {
								title: "Editar informacion del rol"
							}
						}
					]
				}
			]
		},
		{
			path: "*",
			redirect: "/pages/404"
		}
	]
});
router.beforeEach((to, from, next) => {
	document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
	next();
});
// router.beforeEach((to, from, next) => {
// 	document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
// 	const publicPages = ["/login"];
// 	const authRequired = !publicPages.includes(to.path);
// 	const loggedIn = localStorage.getItem("user");
// 	if (authRequired && !loggedIn) {
// 		return next("/login");
// 	}
// 	next();
// });
