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
						(this.materias = response.data.data.map((item, id) => {
							return {
								...item,
								id
							};
						})), (this.isLoading = false);
						this.total = response.data.total;
					} else {
						console.log(response);
						this.isLoading = false;
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
		MateriaStore() {
			this.show_toast = false;
			this.isLoading = true;
			axios
				.post("/materias", this.materia)
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
		MateriaEdit(id) {
			console.log("Metodo edit" + " - " + id);
		},
		/*-----------------------------------*/
		MateriaUpdate(id) {
			console.log("Metodo update" + " - " + id);
		},
		/*-----------------------------------*/
		MateriaDestroy(id) {
			console.log("Metodo destroy" + " - " + id);
		}
	}
};
