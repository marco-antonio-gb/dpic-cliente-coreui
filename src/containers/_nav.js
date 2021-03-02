export default [
	{
		_name: "CSidebarNav",
		_children: [
			{
				_name: "CSidebarNavTitle",
				_children: ["Inicio"]
			},
			{
				_name: "CSidebarNavItem",
				name: "Postgraduantes",
				to: "/postgraduantes",
				icon: "cil-pencil"
			},
			{
				_name: "CSidebarNavItem",
				name: "Postgrados",
				to: "/postgrados",
				icon: "cil-book"
			},
			{
				_name: "CSidebarNavItem",
				name: "Pagos",
				to: "/pagos",
				icon: "cil-book"
			},
			{
				_name: "CSidebarNavItem",
				name: "Materias",
				to: "/materias",
				icon: "cil-book"
			},
			{
				_name: "CSidebarNavItem",
				name: "Docentes",
				to: "/docentes",
				icon: "cil-book"
			},
			{
				_name: "CSidebarNavTitle",
				_children: ["Academico"]
			},
			{
				_name: "CSidebarNavItem",
				name: "Inscripciones",
				to: "/inscripciones",
				icon: "cil-user"
			},

			{
				_name: "CSidebarNavTitle",
				_children: ["Administracion"]
			},
			{
				_name: "CSidebarNavItem",
				name: "Usuarios",
				to: "/usuarios",
				icon: "cil-user"
			}
		]
	}
];
