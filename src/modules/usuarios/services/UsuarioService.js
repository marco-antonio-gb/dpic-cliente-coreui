import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions({
			log_out: "auth/tokenExpired"
		}),
		/*-----------------------------------*/
		UsuarioIndex() {
			this.isLoading = true;
			axios
				.get("/usuarios")
				.then(response => {
					if (response.status === 200) {
						(this.usuarios = response.data.data.map((item, id) => {
							return {
								...item,
								id
							};
						})), (this.isLoading = false);
						this.total = response.data.total;
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
		UsuarioStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post("/usuarios", this.usuario)
				.then(response => {
					if (response.status === 201) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						// this.show_toast = false;
						this.resetForm();
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
		},
		/*-----------------------------------*/
		UsuarioShow(id) {
			this.isLoading = true;
			axios
				.get("/usuarios/" + id)
				.then(response => {
					if (response.status === 200) {
						this.usuario = response.data.data;
						this.isLoading = false;
						// this.total = response.data.total;
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
		UsuarioUpdate(id) {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.put("/usuarios/" + id, this.usuario)
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						// this.show_toast = false;
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
		UsuarioDestroy(id) {
			this.show_toast = false;
			// this.isLoading = true;
			axios
				.delete("/usuarios/" + id)
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
