import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { preloader } from "@/plugins/preloader";

/* eslint-disable */
import Home from '@/views/home.vue';

import loginRoute from "@/views/login.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: loginRoute,
        meta: { notProtected: true }
    },
    {
        path: "/blog",
        name: "blog",
        component: () =>
            import ("@/views/blog.vue")
    },
    {
        path: "/client",
        name: "clients",
        component: () =>
            import ("@/views/blog.vue")
    },
    {
        path: "/blog/:slug",
        name: "blogitem",
        component: () =>
            import ("@/views/BlogItem.vue")
    },
    {
        path: "/404",
        name: "404",
        component: () =>
            import ("@/views/error-404.vue")
    },
    {
        path: "*",
        redirect: "/404"
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach(async(to, from, next) => {
    console.time("XXX");
    await preloader.showWithDelay(300); // (0--------150--------300)
    console.timeEnd("XXX");

    if (
        to.matched.some(record => record.meta.notProtected) ||
        store.getters["auth/isLogin"]
    ) {
        preloader.hideWithDelay(400);
        return next();
    }

    store.dispatch("auth/login").then(
        () => {
            // alert(11);
            preloader.hide();
            next();
        },
        () => {
            preloader.hide();
            next("/login");
        }
    );
});
export default router;