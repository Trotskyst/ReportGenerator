import Vue from 'vue'
import Vuex from 'vuex'
import fileinput from './modules/fileinput'
import filter from './modules/filter'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        fileinput,
        filter,
    }
})