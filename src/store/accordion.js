import { http } from "@/plugins/http";
// import Vue from "vue";
/* eslint-disable */
// const mutt = {
//     // SET_ACCORDION: "SET_ACCORDION",
//     // SET_HOME_ARTICLES: "SET_HOME_ARTICLES",
//     // SET_FILT_ARTICLES: "SET_FILT_ARTICLES",
//     // SET_SINGLE_ARCTICLE: "SET_SINGLE_ARCTICLE",
//     // DEL_SINGLE_ARCTICLE: "DEL_SINGLE_ARCTICLE",
//     // SET_ARTICLES: "SET_ARTICLES",
//     // SET_TAGS: "SET_TAGS",
//     // SET_LOADED: "SET_LOADED"
// };

// export { mutt };

export default {
    namespaced: true,
    state: {

        accordion: [],
        //

    },
    mutations: {
        mutation_accordion(state, accordion_arrays) {
            state.accordion = accordion_arrays;
        },
    },
    actions: {
        getAccordion({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("/api/content/suffixproject/accordion").then(
                    r => {
                        commit('mutation_accordion', r.data.items);
                        resolve(r.data);
                    },
                    ({ response }) => {
                        reject(response.data);
                    }
                );
            });
        },
    },
    getters: {
        // tagFirst(state) {
        //     return state.tags[0] || null;
        // },
        // tagExceptFirst(state) {
        //     return state.tags.splice(1) || [];
        // },
        // getTagById(state) {
        //     return function(id) {
        //         console.log("111", state.tags);

        //         return state.tags.find(i => i.id === id);
        //     };
        // },
        // articlesCount(state) {
        //     return state.articles.length;
        // },
        // firstArtice(state) {

        //     return state.articles[0] || null;
        // },
        // exceptFirstArtices(state) {
        //     return state.articles.splice(1) || [];
        // },
        // exceptAccordion(state) {
        //     return state.accordion[0] || [];
        // }
    }
};