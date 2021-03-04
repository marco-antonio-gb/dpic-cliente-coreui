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
			(this.inscripcion.postgraduante.paterno =
				""), (this.inscripcion.postgraduante.materno =
				""), (this.inscripcion.postgraduante.nombres =
				""), (this.inscripcion.postgraduante.ci =
				""), (this.inscripcion.postgraduante.ci_ext =
				""), (this.inscripcion.postgraduante.lugar_nac =
				""), (this.inscripcion.postgraduante.fecha_nac =
				""), (this.inscripcion.postgraduante.direc_domicilio =
				""), (this.inscripcion.postgraduante.nro_domicilio =
				""), (this.inscripcion.postgraduante.telf_domicilio =
				""), (this.inscripcion.postgraduante.celular =
				""), (this.inscripcion.postgraduante.correo =
				""), (this.inscripcion.postgraduante.profesion =
				""), (this.inscripcion.postgraduante.lugar_trabajo =
				""), (this.inscripcion.postgraduante.telf_trabajo =
				""), (this.inscripcion.postgraduante.lugar_estudio =
				""), (this.inscripcion.postgraduante.observaciones =
				""), (this.inscripcion.postgraduante.foto =
				""), (this.inscripcion.postgrado.postgrado_id =
				""), (this.inscripcion.pagos = []);
		},
		cancelarInscripcionAdd() {
			this.resetForm();
			this.$router.go(-1);
		}
	}
};
