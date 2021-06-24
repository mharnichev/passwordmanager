import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// general CSS
import "../src/assets/css/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
