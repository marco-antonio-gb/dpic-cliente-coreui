export default {
	navItems: [
		{
			_name: "CSidebarNavTitle",
			_children: ["Inicio"],
			permissions: ["Sistemas", "Administrador"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Postgraduantes",
			to: "/postgraduantes",
			icon: "cil-pencil",
			permissions: ["Sistemas", "Administrador", "Docente"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Postgrados",
			to: "/postgrados",
			icon: "cil-book",
			permissions: ["Sistemas", "Administrador", "Docente"]
		},
		// {
		// 	_name: "CSidebarNavItem",
		// 	name: "Pagos",
		// 	to: "/pagos",
		// 	icon: "cil-dollar"
		// 	permissions: ["Sistemas"]
		// },
		{
			_name: "CSidebarNavItem",
			name: "Materias",
			to: "/materias",
			icon: "cil-book",
			permissions: ["Sistemas", "Administrador", "Docente"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Docentes",
			to: "/docentes",
			icon: "cil-book",
			permissions: ["Sistemas", "Administrador"]
		},
		// {
		// 	_name: "CSidebarNavTitle",
		// 	_children: ["Academico"],
		// 	permissions: ["Sistemas", "Administrador", "Docente"]
		// },
		// {
		// 	_name: "CSidebarNavItem",
		// 	name: "Inscripciones",
		// 	to: "/inscripciones",
		// 	icon: "cil-education",
		// 	permissions: ["Sistemas"]
		// },
		{
			_name: "CSidebarNavTitle",
			_children: ["Administracion"],
			permissions: ["Sistemas", "Administrador"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Usuarios",
			to: "/usuarios",
			icon: "cil-user",
			permissions: ["Sistemas", "Administrador"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Permisos",
			to: "/permisos",
			icon: "cil-shield-alt",
			permissions: ["Sistemas", "Administrador"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Roles",
			to: "/roles",
			icon: "cil-https",
			permissions: ["Sistemas", "Administrador"]
		}
	]
};
