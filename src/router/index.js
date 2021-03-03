import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
const Login = () => import("@/views/pages/Login");
// Containers
const TheContainer = () => import("@/containers/TheContainer");
//Modules
const UsuariosContainer = () => import("@/modules/usuarios/Usuarios");
const UsuarioAdd = () => import("@/modules/usuarios/views/UsuarioAdd");
const UsuarioDetail = () => import("@/modules/usuarios/views/UsuarioDetail");
const UsuarioList = () => import("@/modules/usuarios/views/UsuarioList");
const UsuarioUpdate = () => import("@/modules/usuarios/views/UsuarioUpdate");
//views
const Dashboard = () => import("@/views/Dashboard");
//potgraduantes
const Postgraduantes = () => import("@/modules/postgraduantes/Postgraduantes");
const PostgraduantesAdd = () =>
	import("@/modules/postgraduantes/views/PostgraduantesAdd");
const PostgraduantesDetail = () =>
	import("@/modules/postgraduantes/views/PostgraduantesDetail");
const PostgraduantesList = () =>
	import("@/modules/postgraduantes/views/PostgraduantesList");
const PostgraduantesUpdate = () =>
	import("@/modules/postgraduantes/views/PostgraduantesUpdate");
//potgrados
const Postgrados = () => import("@/modules/postgrados/Postgrados");
const PostgradosAdd = () => import("@/modules/postgrados/views/PostgradoAdd");
const PostgradosDetail = () =>
	import("@/modules/postgrados/views/PostgradoDetail");
const PostgradosList = () => import("@/modules/postgrados/views/PostgradoList");
const PostgradosUpdate = () =>
	import("@/modules/postgrados/views/PostgradoUpdate");
//docentes
const Docentes = () => import("@/modules/docentes/Docentes");
const DocentesAdd = () => import("@/modules/docentes/views/DocenteAdd");
const DocentesDetail = () => import("@/modules/docentes/views/DocenteDetail");
const DocentesList = () => import("@/modules/docentes/views/DocenteList");
const DocentesUpdate = () => import("@/modules/docentes/views/DocenteUpdate");
//pagos
const Pagos = () => import("@/modules/pagos/Pagos");
const PagosAdd = () => import("@/modules/pagos/views/PagoAdd");
const PagosDetail = () => import("@/modules/pagos/views/PagoDetail");
const PagosList = () => import("@/modules/pagos/views/PagoList");
const PagosUpdate = () => import("@/modules/pagos/views/PagoUpdate");
//pagos
const Materias = () => import("@/modules/materias/Materias");
const MateriasAdd = () => import("@/modules/materias/views/MateriaAdd");
const MateriasDetail = () => import("@/modules/materias/views/MateriaDetail");
const MateriasList = () => import("@/modules/materias/views/MateriaList");
const MateriasUpdate = () => import("@/modules/materias/views/MateriaUpdate");
//inscripciones
const Inscripciones = () => import("@/modules/inscripciones/Inscripciones");
const InscripcionList = () =>
	import("@/modules/inscripciones/views/InscripcionList");
const InscripcionUpdate = () =>
	import("@/modules/inscripciones/views/InscripcionUpdate");
const InscripcionAdd = () =>
	import("@/modules/inscripciones/views/InscripcionAdd");
const InscripcionDetail = () =>
	import("@/modules/inscripciones/views/InscripcionDetail");
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
			name: "Home",
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
							name: "Agregar Usuario",
							component: UsuarioAdd,
							meta: { title: "Agregar usuario" }
						},
						{
							path: "/usuarios/detail/:idUsuario",
							name: "detalleUsuario",
							component: UsuarioDetail,
							meta: { title: "Detalle usuario" }
						},
						{
							path: "/usuarios/update/:idUsuario",
							name: "Editar Usuario",
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
						}
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
