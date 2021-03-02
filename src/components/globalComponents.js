import Vue from "vue";

import goback from "./GoBack.vue";

Vue.component("goback", () => import("./GoBack.vue"));
