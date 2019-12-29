export default {
    actions: {
        async FilterDepartments(context, filter) {
            context.commit("set_filter_departments", filter);

        },
        async FilterDivisions(context, filter) {
            context.commit("set_filter_divisions", filter);

        },
        async FilterTargetItems(context, filter) {
            context.commit("set_filter_targetitems", filter);

        },
        },
    mutations: {
        set_filter_departments(state, filter) {
            state.filter_departmens = filter
        },
        set_filter_divisions(state, filter) {
            state.filter_divisions = filter
        },
        set_filter_targetitems(state, filter) {
            state.filter_targetitems = filter
        },
    },
    state: {
        filter_departmens: [],
        filter_divisions: [],
        filter_targetitems: [],
    },
    getters: {
        getfilterdepartments(state) {
            return state.filter_departmens;
        },
        getfilterdivisions(state) {
            return state.filter_divisions;
        },
        getfiltertargetitems(state) {
            return state.filter_targetitems;
        },
    },
}