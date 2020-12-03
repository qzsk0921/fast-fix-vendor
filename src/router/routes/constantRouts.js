import { AppMain, Tabbar } from "@/components";

const constantRoutes = [
  {
    path: "/",
    redirect: "/home/child1",
    name: "Home",
  },
  {
    path: "/home",
    name: "home",
    components: {
      default: AppMain,
      tabbar: Tabbar,
    },
    children: [
      {
        path: "child1",
        name: "Child1",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/child1"),
      },
      {
        path: "child2",
        name: "Child2",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/child2"),
      },
      {
        path: "child3",
        name: "Child3",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/child3"),
      },
      {
        path: "child4",
        name: "Child4",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/child4"),
      },
    ],
  },
  {
    path: "/order/:id/:chain/:type", //chain：0外链（走外链逻辑，报过价就只能查看，不能修改报价）1内部应用（报价后可继续修改报价）
    name: "Order",
    component: () => import(/* webpackChunkName: 'order' */ "@/views/order"),
  },
  {
    path: "/my",
    name: "My",
    component: () => import(/* webpackChunkName: 'my' */ "@/views/my"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

export default constantRoutes;
