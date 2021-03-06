import { http } from "@/plugins/http";
import Vue from "vue";
/* eslint-disable */
const mutt = {
    SET_ACCORDION: "SET_ACCORDION",
    SET_HOME_ARTICLES: "SET_HOME_ARTICLES",
    SET_FILT_ARTICLES: "SET_FILT_ARTICLES",
    SET_SINGLE_ARCTICLE: "SET_SINGLE_ARCTICLE",
    DEL_SINGLE_ARCTICLE: "DEL_SINGLE_ARCTICLE",
    SET_ARTICLES: "SET_ARTICLES",
    SET_TAGS: "SET_TAGS",
    SET_LOADED: "SET_LOADED"
};

export { mutt };

export default {
    namespaced: true,
    state: {
        articleHome: {
            // hot: [1,2,3,4],
            // news: [1,2,3]
        },
        articles: [],
        filteredArticles: [],
        tags: [],
        singleArticle: [],
        loaded: false
    },
    mutations: {
        [mutt.SET_HOME_ARTICLES](state, { tag, data }) {
            Vue.set(state.articleHome, tag, data);
        },
        [mutt.SET_FILT_ARTICLES](state, articles) {
            state.filteredArticles = articles;
        },
        [mutt.SET_ARTICLES](state, articles) {
            state.articles = articles;
        },
        [mutt.SET_TAGS](state, tags) {
            state.tags = tags;
        },
        [mutt.SET_LOADED](state) {
            state.loaded = true;
        },
        [mutt.DEL_SINGLE_ARCTICLE](state) {
            state.singleArticle = null;
        },
        [mutt.SET_SINGLE_ARCTICLE](state, value) {
            state.singleArticle = value;
        }
    },
    actions: {

        getTags({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("/api/content/suffixproject/article-categories").then(
                    r => {
                        commit(mutt.SET_TAGS, r.data.items);
                        resolve(r.data);
                    },
                    ({ response }) => {
                        reject(response.data);
                    }
                );
            });
        },
        getArticles({ commit, state, dispatch }) {
            if (state.loaded) return;

            commit(mutt.SET_LOADED);
            return Promise.all([
                new Promise((resolve, reject) => {
                    http.get("/api/content/suffixproject/articles").then(
                        r => {
                            commit(mutt.SET_ARTICLES, r.data.items);
                            resolve(r.data);
                        },
                        ({ response }) => {
                            reject(response.data);
                        }
                    );
                }),
                dispatch("getTags")
            ]);
        },
        getArticleBySlug({ commit }, slug) {
            return new Promise((resolve, reject) => {
                http
                    .get("/api/content/suffixproject/articles", {
                        params: {
                            $filter: `data/slug/iv eq '${slug}'`
                        }
                    })
                    .then(
                        r => {
                            commit(
                                mutt.SET_SINGLE_ARCTICLE,
                                r.data.items[0] ? r.data.items[0].data : null
                            );
                            resolve(r.data);
                        },
                        ({ response }) => {
                            reject(response.data);
                        }
                    );
            });
        },
        setArticlesWithTag({ state, commit }) {
            const allRequestForTags = state.tags.map((tag, i) => {
                return new Promise((resolve, reject) => {
                    console.log(tag);

                    const objectWithSettings = {
                        params: {
                            $filter: `data/categs/iv eq '${tag.id}'`,
                            $top: !i ? 4 : 3
                        }
                    };
                    http.get("/api/content/suffixproject/articles", objectWithSettings).then(
                        r => {
                            commit(mutt.SET_HOME_ARTICLES, {
                                data: r.data.items,
                                tag: tag.data.category
                            });
                            resolve();
                        },
                        ({ response }) => {
                            reject(response.data);
                        }
                    );
                });
            });

            return Promise.all(allRequestForTags);
        },
        getArticlesForHome({ dispatch }) {
            return dispatch("getTags").then(() => {
                return dispatch("setArticlesWithTag");
            });
        },
        getArticlesByTag({ commit, dispatch }, tagId) {
            const objectWithSettings = tagId ? {
                    params: {
                        $filter: `data/categs/iv eq '${tagId}'`
                    }
                } :
                null;
            return Promise.all([
                (new Promise((resolve, reject) => {
                        http.get("/api/content/suffixproject/articles", objectWithSettings).then(
                            r => {
                                commit(mutt.SET_FILT_ARTICLES, r.data.items);
                                resolve(r.data);
                            },
                            ({ response }) => {
                                reject(response.data);
                            }
                        );
                    }),
                    dispatch("getTags"))
            ]);
        }
    },
    getters: {
        tagFirst(state) {
            return state.tags[0] || null;
        },
        tagExceptFirst(state) {
            return state.tags.slice(1) || [];
        },
        getTagById(state) {
            return function(id) {
                return state.tags.find(i => i.id === id);
            };
        },
        articlesCount(state) {
            return state.articles.length;
        },
        firstArtice(state) {

            return state.articles[0] || null;
        },
        exceptFirstArtices(state) {
            return state.articles.splice(1) || [];
        },
    }
};