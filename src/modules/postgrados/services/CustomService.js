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
				""), (this.postgrado.fecha_final =
				""), (this.postgrado.cantidad_pagos =
				""), (this.postgrado.precio =
				""), (this.postgrado.gestion = new Date().getFullYear()), (this.postgrado.nivel_id =
				"");
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
		}
	}
};
