import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "./routes/";

Vue.use(VueRouter);

const routes = [...constantRoutes];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;
