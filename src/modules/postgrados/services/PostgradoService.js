import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions({
			log_out: "auth/tokenExpired"
		}),
		/*-----------------------------------*/
		PostgradoIndex() {
			this.isLoading = true;
			axios
				.get("/postgrados")
				.then(response => {
					if (response.status === 200) {
						(this.postgrados = response.data.data.map(
							(item, id) => {
								return {
									...item,
									id
								};
							}
						)), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						console.log(response);
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
						this.log_out(true);
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
					if (error.response) {
						console.log(error.response.data.message);
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
		/*-----------------------------------*/
		PostgradoShow(id) {
			this.isLoading = true;
			axios
				.get("/postgrados/" + id)
				.then(response => {
					if (response.status === 200) {
						(this.postgrado =
							response.data.data), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						console.log(response);
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
						this.log_out(true);
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
		/*-----------------------------------*/
		PostgradoEdit(id) {},
		/*-----------------------------------*/
		PostgradoUpdate(id) {
			this.isLoading = true;
			axios
				.put("/postgrados/" + id, this.postgrado)
				.then(response => {
					if (response.status === 201) {
						this.isLoading = false;
						this.showToast(response.data.message, true, "success");
					} else {
						console.log(response);
					}
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
						this.log_out(true);
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
		/*-----------------------------------*/
		PostgradoDestroy(id) {
			console.log("Metodo destroy" + " - " + id);
		}
	}
};
