import axios from "axios";
import { router } from "../router";

export default {
	namespaced: true,
	state: {
		token: null,
		user: null,
		error: null,
		refresh: false
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
		REFRESH_TOKEN(state, data) {
			state.refresh = data;
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
				} catch (e) {
					commit("SET_TOKEN", null);
					commit("SET_USER", null);
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
		tokenExpired({ commit }, logout) {
			if (logout) {
				router.replace({
					name: "login"
				});
				commit("SET_TOKEN", null);
				commit("SET_USER", null);
			}
		},
		clearError({ commit }) {
			commit("CLEAR_ERROR", null);
		},
		signOut({ commit }) {
			return axios.post("auth/logout").then(() => {
				commit("SET_TOKEN", null);
				commit("SET_USER", null);
			});
		}
	}
};
