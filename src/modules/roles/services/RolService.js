const API = "/roles";
export default {
	methods: {
		getRoles() {
			this.isLoading = true;
			axios
				.get(API)
				.then(response => {
					if (response.data.success) {
						(this.roles =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
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
		/*-----------------------------------*/
		RolStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post(API, this.rol)
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
		/*-----------------------------------*/
		RolShow(id) {
			this.isLoading = true;
			axios
				.get(API + "/" + id)
				.then(response => {
					if (response.data.success) {
						(this.rol = response.data.data.rol), (this.permisos =
							response.data.data.permisos);
						this.isLoading = false;
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "warning");
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
		/*-----------------------------------*/
		RolUpdate(id) {
			this.show_toast = false;
			this.isLoading = true;
			let data = (this.rol.permisos = this.permisos);

			axios
				.put(API + "/" + id, this.rol)
				.then(response => {
					if (response.data.success) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
						// this.show_toast = false;
						this.resetForm();
					} else {
						this.showToast(response.data.message, true, "warning");
						this.isLoading = false;
						// this.show_toast = false;
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
		/*-----------------------------------*/
		RolDestroy(id) {
			this.show_toast = false;
			// this.isLoading = true;
			axios
				.delete(API + "/" + id)
				.then(response => {
					if (response.data.success) {
						this.showToast(response.data.message, true, "success");
						this.getRoles();
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
		// ****************************** CUSTOM FUNCTIONS *****************************
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
			this.rol.name = "";
			this.rol.guard_name = "api";
			this.rol.descripcion = "";
			this.rol.permisos = [];
			this.permisos = [];
		},
		cancelarRolAdd() {
			this.resetForm();
			this.$router.go(-1);
		},
		cancelarRolUpdate() {
			this.resetForm();
			this.$router.go(-1);
		},
		deleteRol(id) {
			this.$confirm({
				title: "Eliminar registro",
				message: `Esta seguro(a) que desea eliminar el ROL?`,
				button: {
					no: "No",
					yes: "Eliminar"
				},
				callback: confirm => {
					if (confirm) {
						this.RolDestroy(id);
					}
				}
			});
		}
	}
};
