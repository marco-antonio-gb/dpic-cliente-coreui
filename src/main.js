import "core-js/stable";
import Vue from "vue";
import App from "./App";
import { router } from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import babelPolyfill from "babel-polyfill";
import store from "./store/";
window.axios = require("axios");
axios.defaults.baseURL = process.env.VUE_APP_URL_API;
Vue.config.performance = true;
Vue.config.productionTip = false;
Vue.use(CoreuiVue);
require("@/store/subscriber");
Vue.prototype.$log = console.log.bind(console);
store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
	new Vue({
		el: "#app",
		router,
		store,
		icons,
		template: "<App/>",
		components: {
			App
		}
	});
});
