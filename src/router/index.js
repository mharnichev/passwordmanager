import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    beforeEnter: (to, from, next) => {
      next({ name: "Login" });
    },
  },
  {
    path: "/dashboard",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "main" */ "../views/main/index.vue"),
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("isLogin"));
      !data ? next({ name: "Login" }) : next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/login.vue"),
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("isLogin"));
      data ? next({ name: "Home" }) : next();
    },
  },
  {
    path: "/reg",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/auth/registration.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
