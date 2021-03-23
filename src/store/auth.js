import axios from "axios";
export default {
	namespaced: true,
	state: {
		token: null,
		user: null,
		error: null,
		refresh: false,
		permissions: null,
		roles: null
	},
	getters: {
		authenticated(state) {
			return state.token && state.user;
		},
		user(state) {
			return state.user;
		},
		error(state) {
			return state.error;
		},
		refresh(state) {
			return state.refresh;
		},
		permisos(state) {
			return state.permissions;
		},
		roles(state) {
			return state.roles;
		}
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
		},
		SET_USER(state, data) {
			state.user = data;
		},
		SET_ERROR(state, data) {
			state.error = data;
		},
		CLEAR_ERROR(state, data) {
			state.error = data;
		},

		SET_PERMISSIONS(state, data) {
			state.permissions = data;
		},
		SET_ROLES(state, data) {
			state.roles = data;
		}
	},
	actions: {
		async signIn({ dispatch, commit }, credentials) {
			commit("CLEAR_ERROR", null);
			let response = await axios.post("auth/login", credentials);
			return dispatch("attempt", response.data.access_token);
		},
		async attempt({ commit, state }, token) {
			if (token) {
				commit("SET_TOKEN", token);
				try {
					let response = await axios.post("auth/me");
					commit("SET_USER", response.data);
					commit("SET_PERMISSIONS", response.data.permisos);
					commit("SET_ROLES", response.data.data.roles);
				} catch (e) {
					commit("SET_TOKEN", null);
					commit("SET_USER", null);
					commit("SET_PERMISSIONS", null);
					commit("SET_ROLES", null);
				}
			}
			if (!state.token) {
				return;
			}
		},
		errorAction({ commit, state }, error) {
			if (error) {
				commit("SET_ERROR", error);
			}
			if (!state.error) {
				return;
			}
		},
		signOut({ commit }) {
			return axios.post("auth/logout").then(() => {
				commit("SET_TOKEN", null);
				commit("SET_USER", null);
			});
		}
	}
};
