export default {
	methods: {
		InscripcionIndex() {
			this.isLoading = true;
			axios
				.get("/inscripciones")
				.then(response => {
					if (response.status === 200) {
						(this.inscripciones = response.data.data.map(
							(item, id) => {
								return {
									...item
								};
							}
						)), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						console.log(response);
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
		InscripcionStore(URL_DATA) {
			console.log(URL_DATA);
			this.show_toast = false;
			this.isLoading = true;
			var url = "";
			if (URL_DATA === "postgrado-postgraduante-existente") {
				url = "inscripciones-postgraduantes-existente";
			} else if (URL_DATA === "postgrado-postgraduante-nuevo") {
				url = "/inscripciones";
			}
			axios
				.post(url, this.inscripcion)
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						// this.show_toast = false;
						this.resetForm();
					} else {
						this.showToast(
							response.data.validator,
							true,
							"warning"
						);
						this.isLoading = false;
					}
				})
				.catch(error => {
					if (error.response) {
						// console.log(error.response.data);
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
		}
	}
};
