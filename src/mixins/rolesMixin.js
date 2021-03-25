import store from "@/store/";
export default {
	methods: {
		can(key) {
			var userPermissions = store.getters["auth/roles"];
			var Permissions = store.getters["auth/permisos"];
			return userPermissions.some(p => key.includes(p.name));
		}
	}
};
