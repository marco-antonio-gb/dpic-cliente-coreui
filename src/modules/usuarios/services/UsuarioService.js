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
		UsuarioStore() {
			console.log("Metodo store");
		},
		/*-----------------------------------*/
		UsuarioShow(id) {
			console.log("Metodo show" + " - " + id);
		},
		/*-----------------------------------*/
		UsuarioEdit(id) {
			console.log("Metodo edit" + " - " + id);
		},
		/*-----------------------------------*/
		UsuarioUpdate(id) {
			console.log("Metodo update" + " - " + id);
		},
		/*-----------------------------------*/
		UsuarioDestroy(id) {
			console.log("Metodo destroy" + " - " + id);
		}
	}
};
