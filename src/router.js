import Vue from "vue";
import Router from "vue-router";
import Connection from "./views/Connection.vue";

const BASE_TITLE = 'SportsTech Treadmill F31';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "connect",
            component: Connection,
            meta: {title: BASE_TITLE + ' - Connect to your Device'}
        },
        {
            path: "/home",
            name: "home",
            component: () => import("./views/Home.vue"),
            meta: {title: BASE_TITLE + ' - Home dashboard'}
        },
        {
            path: "/programEditor",
            name: "programEditor",
            component: () => import("./views/ProgramEditor.vue"),
            meta: {title: BASE_TITLE + ' - Program Editor'}
        },
        {
            path: '*',
            component: () => import("./views/404.vue"),
            meta: {title: BASE_TITLE + ' - Page Not Found'}
        }
    ]
})