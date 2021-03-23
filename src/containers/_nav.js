export default {
	navItems: [
		{
			_name: "CSidebarNavTitle",
			_children: ["Inicio"],
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Postgraduantes",
			to: "/postgraduantes",
			icon: "cil-pencil",
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Postgrados",
			to: "/postgrados",
			icon: "cil-book",
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Pagos",
			to: "/pagos",
			icon: "cil-dollar",
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Materias",
			to: "/materias",
			icon: "cil-book",
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Docentes",
			to: "/docentes",
			icon: "cil-book",
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavTitle",
			_children: ["Academico"],
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Inscripciones",
			to: "/inscripciones",
			icon: "cil-education",
			roles: ["Sistemas"]
		},

		{
			_name: "CSidebarNavTitle",
			_children: ["Administracion"],
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Usuarios",
			to: "/usuarios",
			icon: "cil-user",
			roles: ["Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Permisos",
			to: "/permisos",
			icon: "cil-user",
			roles: ["Docente", "Sistemas"]
		},
		{
			_name: "CSidebarNavItem",
			name: "Roles",
			to: "/roles",
			icon: "cil-user",
			roles: ["Sistemas"]
		}
	]
};
