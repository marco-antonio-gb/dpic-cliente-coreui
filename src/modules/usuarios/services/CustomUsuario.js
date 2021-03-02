export default {
	methods: {
		getTipoUsuario() {
			axios
				.get("/tipo-usuarios")
				.then(response => {
					if (response.status === 200) {
						this.usuario_tipos = response.data;
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
				""), (this.usuario.celular = ""), (this.usuario.titulo_abrv =
				""), (this.usuario.profesion = ""), (this.usuario.tipo_usuario =
				""), (this.usuario.email = ""), (this.usuario.password = "");
		},
		CancelarUsuarioAdd() {
			this.resetForm();
			this.$router.go(-1);
		}
	}
};
