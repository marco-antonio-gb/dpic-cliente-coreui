import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions({
			log_out: "auth/tokenExpired"
		}),
		/*-----------------------------------*/
		PostgraduanteIndex() {
			this.isLoading = true;
			axios
				.get("/postgraduantes")
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.postgraduantes = response.data.data;
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
		PostgraduanteStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post("/postgraduantes", this.postgraduante)
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
		PostgraduanteShow(id) {
			this.isLoading = true;
			axios
				.get("/postgraduantes/" + id)
				.then(response => {
					if (response.status === 200) {
						(this.postgraduante =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						console.log(response);
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
		PostgraduanteEdit(id) {},
		/*-----------------------------------*/
		PostgraduanteUpdate(id) {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.put("/postgraduantes/" + id, this.postgraduante)
				.then(response => {
					if (response.status === 201) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						this.resetForm();
					} else {
						this.showToast(
							response.data.validator,
							true,
							"success"
						);
						this.isLoading = false;
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
		PostgraduanteDestroy(id) {
			this.show_toast = false;
			// this.isLoading = true;
			axios
				.delete("/postgraduantes/" + id)
				.then(response => {
					if (response.data.success) {
						this.showToast(response.data.message, true, "success");
						this.UsuarioIndex();
					} else {
						this.showToast(
							response.data.validator,
							true,
							"success"
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
