import "core-js/stable";
import Vue from "vue";
import App from "./App";
import { router } from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import babelPolyfill from "babel-polyfill";
import store from "./store/";
var numeral = require("numeral");

window.axios = require("axios");
axios.defaults.baseURL = process.env.VUE_APP_URL_API;
Vue.config.performance = true;
Vue.config.productionTip = false;
Vue.use(CoreuiVue);
import VueConfirmDialog from "vue-confirm-dialog";
import "@/components/globalComponents";
Vue.use(VueConfirmDialog);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);
Vue.filter("formatNumber", function(value) {
	return numeral(value).format("0,0.00");
});
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
