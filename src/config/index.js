import { authHeader } from "../_helpers";

export default Object.freeze({
	/* Routs Productions*/

	URL_API: "http://rolando.test/dpic_servidor/public/api",
	URL_API_AUTH: "http://rolando.test/dpic_servidor/public/api",

	/* Routs Development*/

	// URL_API_AUTH: "https://admin.campoferial3dejulio.com/public/api",
	// URL_API: "https://admin.campoferial3dejulio.com/public/api/admin",

	VIEW_CHANGES: true,

	requestOptions: {
		method: "GET",

		headers: authHeader()
	},

	DataTableLang: {
		language: {
			searchPlaceholder: "Buscar",
			sProcessing: "Procesando...",
			sLengthMenu: "Mostrar _MENU_ registros",
			sZeroRecords: "No se encontraron resultados",
			sEmptyTable: "Ningún dato disponible en esta tabla",
			sInfo: " _START_ al _END_ de un total de _TOTAL_ registros",
			sInfoEmpty:
				"Mostrando registros del 0 al 0 de un total de 0 registros",
			sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
			sInfoPostFix: "",
			sSearch: "",
			sUrl: "",
			sInfoThousands: ",",
			sLoadingRecords: "Cargando...",
			oPaginate: {
				sFirst: "Primero",
				sLast: "Último",
				sNext: "Siguiente",
				sPrevious: "Anterior"
			},
			oAria: {
				sSortAscending:
					": Activar para ordenar la columna de manera ascendente",
				sSortDescending:
					": Activar para ordenar la columna de manera descendente"
			}
		}
	}
});
