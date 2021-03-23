const API = "/permisos";
export default {
	methods: {
		getPermisos() {
			this.isLoading = true;
			axios
				.get(API)
				.then(response => {
					if (response.data.success) {
						(this.permisos =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "");
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status === 403) {
						this.showToast(
							"Error 403 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.response.status === 500) {
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
		PermisoStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post(API, this.permiso)
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
					if (error.response.status === 403) {
						this.showToast(
							"Error 403 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.response.status === 500) {
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
		PermisoShow(id) {
			this.isLoading = true;
			axios
				.get(API + "/" + id)
				.then(response => {
					if (response.data.success) {
						(this.permiso =
							response.data.data), (this.isLoading = false);
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "warning");
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response.status === 403) {
						this.showToast(
							"Error 403 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.response.status === 500) {
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
		PermisoUpdate(id) {
			console.log(this.permiso);
			this.show_toast = false;
			this.isLoading = true;
			axios
				.put(API + "/" + id, this.permiso)
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
					if (error.response.status === 403) {
						this.showToast(
							"Error 403 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.response.status === 500) {
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
		PermisoDestroy(id) {
			this.show_toast = false;
			// this.isLoading = true;
			axios
				.delete(API + "/" + id)
				.then(response => {
					if (response.data.success) {
						this.showToast(response.data.message, true, "success");
						this.getPermisos();
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
					if (error.response.status === 403) {
						this.showToast(
							"Error 403 (server): " +
								error.response.data.message,
							true,
							"danger"
						);
					} else if (error.response.status === 500) {
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
			this.permiso.name = "";
			this.permiso.guard_name = "api";
			this.permiso.descripcion = "";
		},
		cancelarPermisoAdd() {
			this.resetForm();
			this.$router.go(-1);
		},
		cancelarPermisoUpdate() {
			this.resetForm();
			this.$router.go(-1);
		},
		deletePermiso(id) {
			this.$confirm({
				title: "Eliminar registro",
				message: `Esta seguro(a) que desea eliminar el PERMISO?`,
				button: {
					no: "No",
					yes: "Eliminar"
				},
				callback: confirm => {
					if (confirm) {
						this.PermisoDestroy(id);
					}
				}
			});
		}
	}
};
