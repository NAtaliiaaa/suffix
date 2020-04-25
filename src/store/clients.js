import { http } from "@/plugins/http";
export default {
    namespaced: true,
    state: {
        clients: [],
    },
    mutations: {
        mutation_clients(state, clients_arrays) {
            state.clients = clients_arrays;
        },
    },
    actions: {
        getClients({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("/api/content/suffixproject/clients").then(
                    r => {
                        commit('mutation_clients', r.data.items);
                        resolve(r.data);
                    },
                    ({ response }) => {
                        reject(response.data);
                    }
                );
            });
        },
    },
};