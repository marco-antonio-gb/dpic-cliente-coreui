import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions({
			log_out: "auth/tokenExpired"
		}),
		/*-----------------------------------*/
		MateriaIndex() {
			this.isLoading = true;
			axios
				.get("/materias")
				.then(response => {
					if (response.data.success) {
						(this.materias =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "");
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response) {
						this.showToast(
							"SERVER a: " + error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(
							"SERVER v: " + error.request,
							true,
							"danger"
						);
					} else {
						this.showToast(
							"SERVER c: " + error.message,
							true,
							"danger"
						);
					}
				});
		},
		/*-----------------------------------*/
		MateriaStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post("/materias", this.materia)
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						this.resetForm();
					} else {
						this.isLoading = false;
						if (response.data.validator) {
							this.showToast(
								response.data.validator,
								true,
								"warning"
							);
						}
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status == 404) {
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
		/*-----------------------------------*/
		MateriaShow(id) {
			this.isLoading = true;
			axios
				.get("/materias/" + id)
				.then(response => {
					if (response.status === 200) {
						(this.materia =
							response.data.data), (this.isLoading = false);
					} else {
						console.log(response);
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status == 404) {
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

		/*-----------------------------------*/
		MateriaUpdate(id) {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.put("/materias/" + id, this.materia)
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						// this.show_toast = false;
						this.resetForm();
					} else {
						if (response.data.validator) {
							this.showToast(
								response.data.validator,
								true,
								"warning"
							);
							// this.show_toast = false;
						} else {
							console.log("nada");
						}
						this.isLoading = false;
						// this.show_toast = false;
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status == 404) {
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
		/*-----------------------------------*/
		MateriaDestroy(id) {
			this.show_toast = false;
			// this.isLoading = true;
			axios
				.delete("/materias/" + id)
				.then(response => {
					if (response.data.success) {
						this.showToast(response.data.message, true, "success");
						this.MateriaIndex();
					} else {
						console.log(response);
						this.showToast(
							"Error al eliminar el registro",
							true,
							"warning"
						);
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status == 404) {
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
		}
	}
};
