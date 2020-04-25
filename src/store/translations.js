import { http } from "@/plugins/http";
import { i18n } from "@/plugins/i18n";

const mutt = {
    SET_TRANSLATIONS: "SET_TRANSLATIONS"
};

export default {
    namespaced: true,
    state: {
        trans: []
    },
    mutations: {
        [mutt.SET_TRANSLATIONS](state, trans) {
            state.trans = trans;
            i18n.setLocaleMessage(i18n.locale, trans[0].data.list);
        }
    },
    actions: {
        getAll({ state, commit }) {
            if (state.trans.length) return;
            return new Promise((resolve, reject) => {
                http.get("/api/content/suffixproject/translations/").then(
                    r => {
                        commit(mutt.SET_TRANSLATIONS, r.data.items);
                        resolve(r.data); // 200 status
                    },
                    ({ response }) => {
                        reject(response.data);
                    }
                );
            });
        }
        // getAll({ commit }) {
        //     // if (state.trans.length) return;
        //     return new Promise((resolve) => {
        //         http.get("/api/content/suffixproject/translations").then((res) => {
        //                 commit(mutt.SET_TRANSLATIONS, r.data.items);
        //                 resolve(r.data); // 200 status
        //             },
        //             ({ response }) => {
        //                 reject(response.data);
        //             }
        //         );
        //     });
        // }
    }
};