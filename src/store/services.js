import { http } from "@/plugins/http";

export default {
    namespaced: true,
    state: {
        services: [],
    },
    mutations: {
        mutation_services(state, services_arrays) {
            state.services = services_arrays;
        },
    },
    actions: {
        getServices({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("/api/content/suffixproject/services").then(
                    r => {
                        commit('mutation_services', r.data.items);
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

    }
};