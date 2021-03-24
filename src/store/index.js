import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
Vue.use(Vuex);
export default new Vuex.Store({
	namespaced: true,

	state: {
		sidebarShow: "responsive",
		sidebarMinimize: false
	},

	mutations: {
		toggleSidebarDesktop(state) {
			const sidebarOpened = [true, "responsive"].includes(
				state.sidebarShow
			);
			state.sidebarShow = sidebarOpened ? false : "responsive";
		},
		toggleSidebarMobile(state) {
			const sidebarClosed = [false, "responsive"].includes(
				state.sidebarShow
			);
			state.sidebarShow = sidebarClosed ? true : "responsive";
		},
		set(state, [variable, value]) {
			state[variable] = value;
		}
	},

	actions: {},

	modules: {
		auth
	}
});
