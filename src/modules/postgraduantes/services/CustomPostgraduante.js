export default {
	methods: {
		resetForm() {
			(this.postgraduante.paterno = ""), (this.postgraduante.materno =
				""), (this.postgraduante.nombres = ""), (this.postgraduante.ci =
				""), (this.postgraduante.ci_ext =
				""), (this.postgraduante.lugar_nac =
				""), (this.postgraduante.fecha_nac =
				""), (this.postgraduante.direc_domicilio =
				""), (this.postgraduante.nro_domicilio =
				""), (this.postgraduante.telf_domicilio =
				""), (this.postgraduante.celular =
				""), (this.postgraduante.correo =
				""), (this.postgraduante.profesion =
				""), (this.postgraduante.lugar_trabajo =
				""), (this.postgraduante.telf_trabajo =
				""), (this.postgraduante.lugar_estudio =
				""), (this.postgraduante.observaciones =
				""), (this.postgraduante.fecha_inscripcion = new Date()
				.toJSON()
				.slice(0, 10)
				.replace(/-/g, "/")), (this.postgraduante.foto = "");
			this.$router.go(-1);
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
		}
	}
};
