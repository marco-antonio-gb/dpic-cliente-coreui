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
		}
	}
};
