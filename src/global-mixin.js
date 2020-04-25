import { /*mapState,*/ mapGetters } from "vuex";
/* eslint-disable */
export const mixin = {
    methods: {
        _getTag(categories) {
            if (!this.getTagById) throw new Error("NOT_FOUND_METHOD");
            const result = this.getTagById(categories[0]);
            if (!result) return "";

            return result.data.category;
        }
    },
    computed: {
        ...mapGetters("blog", {
            getTagById: "getTagById"
        })
    }
};