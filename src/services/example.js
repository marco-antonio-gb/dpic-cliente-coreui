import store from "@/store";
export default {
	methods: {
		getRoles() {
			return store.getters["auth/roles"];
		}
	}
};
