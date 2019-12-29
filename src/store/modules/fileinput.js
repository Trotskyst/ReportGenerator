export default {
    actions: {},
    mutations: {
        loadFile(state, file) {
            state.file = file
        },
    },
    state: {
        file: []
    },
    getters: {
        getFile(state) {
            return state.file;
        },
        isLoaded(state) {
            return !(Object.keys(state.file).length === 0);
        },
        kbk_departments(state) {
            return [...new Set(state.file.map(item => item.ved_code))].sort();
        },
        kbk_divisions(state) {
            return [...new Set(state.file.map(item => item.podr_code))].sort();
        },
        kbk_target_items(state) {
            return [...new Set(state.file.map(item => item.cs_code))].sort();
        },
    },
}