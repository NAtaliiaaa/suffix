import Vue from "vue";

/**
 * -------------------------------
 * Components
 * -------------------------------
 */
import Header from "@/chunks/header/header";
// import Button from '@/chunks/button/button.vue';

// import ServiceCard from '@/chunks/service-card/service-card.vue';
Vue.component("v-header", Header);
// Vue.component('v-service-card', ServiceCard);
// Vue.component('my-button', Button);
/**
 * -------------------------------
 * Mixins
 * -------------------------------
 */
import { mixin } from "@/global-mixin";
Vue.mixin(mixin);

/**
 * -------------------------------
 * Filters
 * -------------------------------
 */
import moment from "moment";
Vue.filter("formatDate", function(value) {
    if (value) {
        // return moment(String(value)).format('MM/DD/YYYY hh:mm');
        return moment(String(value)).format("MM/DD/YYYY");
    }
});