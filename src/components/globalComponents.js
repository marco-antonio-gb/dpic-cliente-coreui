import Vue from "vue";

import goback from "./GoBack.vue";
import loader from "./Loader.vue";

Vue.component("goback", () => import("./GoBack.vue"));
Vue.component("loader", () => import("./Loader.vue"));
