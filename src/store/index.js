import Vue from "vue";
import Vuex from "vuex";
/**
 * -------
 * Modules
 * -------
 */
import auth from "@/store/auth";
import accordion from "@/store/accordion";
import services from "@/store/services";
import clients from "@/store/clients";
import blog from "@/store/blog";
import translations from "@/store/translations";

Vue.use(Vuex);

export default new Vuex.Store({
    name: {
        services,
    },
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        blog,
        accordion,
        clients,
        services,
        translations
    }
});