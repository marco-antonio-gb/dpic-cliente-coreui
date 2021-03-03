export default {
	methods: {
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
				""), (this.postgrado.fecha_final =
				""), (this.postgrado.cantidad_pagos =
				""), (this.postgrado.precio =
				""), (this.postgrado.gestion = new Date().getFullYear()), (this.postgrado.nivel_id =
				"");
			// this.show_toast = false;
		},
		cancelarInscripcion() {
			this.resetForm();
			this.$router.go(-1);
		}
	}
};
