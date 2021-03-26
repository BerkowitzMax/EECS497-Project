import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import Router from "./router";
import VueTimeago from "vue-timeago";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCp1cVjNl4d8rLISkVmEjQ2obkdbJo0KrQ",
  authDomain: "eecs497-project.firebaseapp.com",
  databaseURL: "https://eecs497-project-default-rtdb.firebaseio.com",
  projectId: "eecs497-project",
  storageBucket: "eecs497-project.appspot.com",
  messagingSenderId: "444308462167",
  appId: "1:444308462167:web:4ec43d4c8d7c89217be112",
  measurementId: "G-92009WVRFH"
};

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueTimeago, {
  name: "timeago",
  locale: "en",
  locales: {
    "zh-CN": require("date-fns/locale/zh_cn"),
    ja: require("date-fns/locale/ja"),
  },
});

new Vue({
  render: (h) => h(App),
  router: Router,
  created() {
    firebase.initializeApp(firebaseConfig);
  }
}).$mount("#app");
