export default {
	methods: {
		getTipoUsuario() {
			axios
				.get("/roles")
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.roles = response.data.data;
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "");
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status === 500) {
						this.showToast(
							"Error 500 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.response.status == 404) {
						this.showToast(
							"Error 404 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(
							"SERVER error request: " + error.request,
							true,
							"danger"
						);
					} else {
						this.showToast(
							"SERVER ?: " + error.message,
							true,
							"danger"
						);
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
			(this.usuario.paterno = ""), (this.usuario.materno =
				""), (this.usuario.nombres = ""), (this.usuario.ci =
				""), (this.usuario.ci_ext = ""), (this.usuario.telefono =
				""), (this.usuario.celular = ""), (this.usuario.profesion =
				""), (this.usuario.roles = []), (this.usuario.email =
				""), (this.usuario.password = "");
		},
		CancelarUsuarioAdd() {
			this.resetForm();
			this.$router.go(-1);
		}
	}
};
