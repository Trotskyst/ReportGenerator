<template>
    <div class="kbk">
<!--        <v-col cols="12">-->
            <v-autocomplete
                    v-model="values"
                    :items="items"
                    outlined
                    clearable
                    deletable-chips
                    flat
                    dense
                    chips
                    small-chips
                    :label="label"
                    multiple
                    @change="filter"
            ></v-autocomplete>
<!--        </v-col>-->
    </div>
</template>


<script>
    import {mapMutations} from "vuex";

    export default {
        props: {
            type: String,
        },
        data: () => ({
            values: [],
            value: null,
            label: '',
            items: [],
        }),
        created() {
            if (this.type === 'departments') {
                this.label = 'Ведомства';
                this.items = this.$store.getters.kbk_departments;
            } else if (this.type === 'divisions') {
                this.label = 'Подразделы';
                this.items = this.$store.getters.kbk_divisions;
            } else if (this.type === 'targetitems') {
                this.label = 'Целевые статьи';
                this.items = this.$store.getters.kbk_target_items;
            }
        },

        methods: {
            ...mapMutations(["set_filter_departments", "set_filter_divisions", "set_filter_targetitems"]),
            filter() {
                if (this.type === 'departments') {
                    this.set_filter_departments(this.values);
                } else if (this.type === 'divisions') {
                    this.set_filter_divisions(this.values);
                } else if (this.type === 'targetitems') {
                    this.set_filter_targetitems(this.values);
                }
            },
        },
    }
</script>

<style scoped>
    .kbk {
        width: 200px;
        margin-right: 20px;
    }

    .v-list-item {
        min-height: 10px;
    }
</style>