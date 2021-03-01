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
					if (response.status === 200) {
						(this.postgraduantes = response.data.data.map(
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
					if (error.response) {
						console.log(error.response.data.message);
						console.log(error.response.status);
						console.log(error.response.headers);
						this.showToast(
							error.response.data.message,
							true,
							"success"
						);
					} else if (error.request) {
						// The request was made but no response was received
						// console.log(error.request);
						this.showToast(error.response, true, "success");
					} else {
						// Something happened in setting up the request that triggered an Error
						// console.log("Error", error.message);
						this.showToast(error.message, true, "success");
					}
					this.isLoading = false;
				});
		},
		/*-----------------------------------*/
		PostgraduanteDestroy(id) {
			console.log("Metodo destroy" + " - " + id);
		}
	}
};
