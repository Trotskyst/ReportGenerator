<template>
    <div class="container">
        <v-col cols="12">
            <v-autocomplete
                    v-model="values"
                    :items="items"
                    outlined
                    dense
                    chips
                    small-chips
                    label="Целевые статьи"
                    multiple
                    @change="FilterTargetItems"
            ></v-autocomplete>
        </v-col>
    </div>
</template>


<script>
    import { mapActions } from "vuex";

    export default {
        data: () => ({
            values: [],
            value: null,
        }),

        computed: {
            items() {
                return this.$store.getters.kbk_target_items;
            },
            filter_targetitems() {
                return this.$store.getters.getfiltertargetitems;
            },
        },
        methods: {
            ...mapActions(["FilterTargetItems"]),
        }
    }
</script>

<style scoped>
    .container {
        width: 300px;
    }

    .v-list-item {
        min-height: 10px;
    }
</style>