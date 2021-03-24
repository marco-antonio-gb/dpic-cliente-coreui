import { mapActions } from "vuex";
import store from "@/store/";
export default {
	methods: {
		...mapActions({
			refreshUserData: "auth/attempt"
		}),
		/*-----------------------------------*/
		UsuarioIndex() {
			this.isLoading = true;
			this.show_toast = false;
			axios
				.get("/usuarios")
				.then(response => {
					if (response.data.success) {
						(this.usuarios =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						this.isLoading = false;

						this.showToast(response.data.message, true, "");
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
			if (this.usuario.roles.length <= 0) {
				this.isLoading = false;
				this.showToast("Seleccione un rol de usuario", true, "warning");
			} else {
				axios
					.post("/usuarios", this.usuario)
					.then(response => {
						if (response.status === 201) {
							this.isLoading = false;
							this.showToast(
								response.data.message,
								true,
								"success"
							);
							// this.show_toast = false;
							this.resetForm();
						} else {
							this.isLoading = false;
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
		},
		/*-----------------------------------*/
		UsuarioShow(id) {
			this.isLoading = true;
			axios
				.get("/usuarios/" + id)
				.then(response => {
					if (response.data.success) {
						this.usuario = response.data.data;
						this.isLoading = false;
						// this.total = response.data.total;
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "");
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

						store
							.dispatch(
								"auth/attempt",
								localStorage.getItem("token")
							)
							.then(() => {
								this.showToast(
									response.data.message,
									true,
									"success"
								);
								this.resetForm();
							});
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
					console.log(error);
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
