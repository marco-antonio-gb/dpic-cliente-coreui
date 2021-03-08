export default {
	methods: {
		DocenteIndex() {
			this.isLoading = true;
			axios
				.get("/docentes")
				.then(response => {
					if (response.status === 200) {
						(this.docentes =
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
		}
	}
};
