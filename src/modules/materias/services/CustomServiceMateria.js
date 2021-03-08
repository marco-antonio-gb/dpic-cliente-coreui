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
			this.materia.nombre = "";
			this.materia.sigla = "";
			this.materia.descripcion = "";
			this.materia.credito = "";
		},
		cancelarMateria() {
			this.resetForm();
			this.$router.go(-1);
		},
		PostgradoIndex() {
			axios
				.get("/postgrados")
				.then(response => {
					if (response.status === 200) {
						this.postgrados = response.data.data;
					} else {
						console.log(response);
						this.isLoading = false;
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
				});
		},
		deleteMateria(id) {
			this.$confirm({
				title: "Eliminar registro",
				message: `Esta seguro(a) que desea eliminar la MATERIA/MODULO?`,
				button: {
					no: "No",
					yes: "Eliminar"
				},

				callback: confirm => {
					if (confirm) {
						this.MateriaDestroy(id);
					}
				}
			});
		}
	}
};
