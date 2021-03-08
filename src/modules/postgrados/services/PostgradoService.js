import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions({
			log_out: "auth/tokenExpired"
		}),
		/*-----------------------------------*/
		PostgradoIndex() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.get("/postgrados")
				.then(response => {
					if (response.status === 200 && response.data.data) {
						this.isLoading = false;
						this.postgrados = response.data.data;
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
							"SERVER: " + error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(
							"SERVER: " + error.request,
							true,
							"danger"
						);
					} else {
						this.showToast(
							"SERVER: " + error.message,
							true,
							"danger"
						);
					}
				});
		},
		/*-----------------------------------*/
		PostgradoStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post("/postgrados", this.postgrado)
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
					if (error.response) {
						this.showToast(
							error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(error.request, true, "danger");
					} else {
						this.showToast(error.message, true, "danger");
					}
				});
		},
		/*-----------------------------------*/
		PostgradoShow(id) {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.get("/postgrados/" + id)
				.then(response => {
					if (response.status === 200) {
						(this.postgrado =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
						this.totalCreditos(this.postgrado);
					} else {
						this.isLoading = false;
						this.showToast(response.data.message, true, "danger");
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response) {
						this.showToast(
							error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(error.request, true, "danger");
					} else {
						this.showToast(error.message, true, "danger");
					}
				});
		},
		/*-----------------------------------*/
		PostgradoUpdate(id) {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.put("/postgrados/" + id, this.postgrado)
				.then(response => {
					if (response.status === 201) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
					} else {
						this.isLoading = false;
						this.showToast(response.data.validator, true, "danger");
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response) {
						this.showToast(
							error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(error.request, true, "danger");
					} else {
						this.showToast(error.message, true, "danger");
					}
				});
		},
		/*-----------------------------------*/
		PostgradoDestroy(id) {
			this.show_toast = false;
			// this.isLoading = true;
			axios
				.delete("/postgrados/" + id)
				.then(response => {
					if (response.data.success) {
						this.showToast(response.data.message, true, "success");
						this.PostgradoIndex();
					} else {
						this.showToast(
							"Error al eliminar el registro",
							true,
							"warning"
						);
					}
				})
				.catch(error => {
					this.isLoading = false;
					if (error.response) {
						this.showToast(
							"SERVER: " + error.response.data.message,
							true,
							"danger"
						);
					} else if (error.request) {
						this.showToast(
							"SERVER: " + error.request,
							true,
							"danger"
						);
					} else {
						this.showToast(
							"SERVER: " + error.message,
							true,
							"danger"
						);
					}
				});
		}
	}
};
