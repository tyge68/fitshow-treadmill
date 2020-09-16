import Vue from "vue";
import Router from "vue-router";
import Connection from "./views/Connection.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "connect",
            component: Connection
        },
        {
            path: "/home",
            name: "home",
            component: () => import("./views/Home.vue") 
        },
    ]
})