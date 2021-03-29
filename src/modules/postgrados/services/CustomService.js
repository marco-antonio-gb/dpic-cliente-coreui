export default {
	methods: {
		showToast(message, status, color) {
			if (typeof message === "string") {
				this.show_toast = status;
				this.message_toast = message;
				this.color_toast = color;
			} else {
				this.show_toast = status;
				this.message_toast = message.join("\n");
				this.color_toast = color;
			}
		},
		resetForm() {
			(this.postgrado.nombre = ""), (this.postgrado.fecha_inicio =
				""), (this.postgrado.cantidad_pagos =
				""), (this.postgrado.precio = ""), (this.postgrado.gestion =
				""), (this.postgrado.nivel_id = "");
			this.postgrado.materias = [];
		},
		cancelarPostgrado() {
			this.resetForm();
			this.$router.go(-1);
		},
		totalCreditos(myArray) {
			var total = 0;
			myArray.materias.forEach(element => {
				total += parseFloat(element.credito);
			});
			this.total_creditos = total;
		},
		getPostgradoPostgraduantes(ide) {
			axios
				.get("/postgrados-postgraduantes/" + ide)
				.then(response => {
					if (response.data.success) {
						this.postgraduantes = response.data.data;
					} else {
						console.log(response);
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
						// this.log_out(true);
					} else if (error.request) {
						// The request was made but no response was received
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
					this.isLoading = false;
				});
		},
		getPostgradoDocentes(ide) {
			axios
				.get("/postgrados-docentes/" + ide)
				.then(response => {
					if (response.data.success) {
						this.docentes = response.data.data;
					} else {
						this.showToast(response.data.message, true, "");
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
						// this.log_out(true);
					} else if (error.request) {
						// The request was made but no response was received
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
					this.isLoading = false;
				});
		},
		handleClick(id) {
			this.$confirm({
				title: "Eliminar registro",
				message: `Esta seguro(a) que desea eliminar el POSTGRADO?`,
				button: {
					no: "No",
					yes: "Eliminar"
				},
				callback: confirm => {
					if (confirm) {
						this.PostgradoDestroy(id);
					}
				}
			});
		},
		reportePagosPostgraduante(POSTGRADO_ID, POSTGRADUANTE_ID, FILE_NAME) {
			this.show_toast = false;
			this.isDownload = true;
			axios({
				url: `/reporte-pagos-personal/${POSTGRADO_ID}/${POSTGRADUANTE_ID}`,
				method: "GET",
				responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					this.isDownload = false;
					this.downloadFile(
						response.data,
						"REPORTE PAGOS - " + FILE_NAME
					);
				})
				.catch(errors => {
					this.isDownload = false;
					console.log(errors.response);
				});
		},
		reporteCalificacionesPostgraduante(
			POSTGRADO_ID,
			POSTGRADUANTE_ID,
			FILE_NAME
		) {
			this.show_toast = false;
			this.isLoading = true;
			axios({
				url: `/reporte-calificaciones-personal/${POSTGRADO_ID}/${POSTGRADUANTE_ID}`,
				method: "GET",
				responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					this.isLoading = false;
					this.downloadFile(
						response.data,
						"REPORTE CALIFICACIONES" + "-" + FILE_NAME
					);
				})
				.catch(errors => {
					this.isLoading = false;
					console.log(errors.response);
				});
		},
		reporteCalificacionesPostgrado(
			POSTGRADO_ID,
			MATERIA_ID,
			DOCENTE_ID,
			FILE_NAME
		) {
			this.show_toast = false;
			this.isLoading = true;
			axios({
				url: `/reporte-calificaciones-asignatura/${POSTGRADO_ID}/${MATERIA_ID}/${DOCENTE_ID}`,
				method: "GET",
				responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					this.isLoading = false;
					this.downloadFile(
						response.data,
						"REPORTE CALIFICACIONES" + "-" + FILE_NAME
					);
				})
				.catch(errors => {
					this.isLoading = false;
					console.log(errors.response);
				});
		},
		reportePagosPostgrado(POSTGRADO_ID, FILE_NAME) {
			this.show_toast = false;
			this.isLoading = true;
			axios({
				url: `/reporte-pagos-general/${POSTGRADO_ID}`,
				method: "GET",
				responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					this.isLoading = false;
					this.downloadFile(
						response.data,
						"REPORTE PAGOS" + "-" + FILE_NAME
					);
				})
				.catch(errors => {
					this.isLoading = false;
					console.log(errors.response);
				});
		},
		downloadFile(response, filename) {
			// It is necessary to create a new blob object with mime-type explicitly set
			// otherwise only Chrome works like it should
			var newBlob = new Blob([response], {
				type: "application/pdf"
			});
			// IE doesn't allow using a blob object directly as link href
			// instead it is necessary to use msSaveOrOpenBlob
			if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(newBlob);
				return;
			}
			// For other browsers:
			// Create a link pointing to the ObjectURL containing the blob.
			const data = window.URL.createObjectURL(newBlob);
			var link = document.createElement("a");
			link.href = data;
			link.download = filename + ".pdf";
			link.click();
			setTimeout(function() {
				// For Firefox it is necessary to delay revoking the ObjectURL
				window.URL.revokeObjectURL(data);
			}, 100);
		}
	}
};
