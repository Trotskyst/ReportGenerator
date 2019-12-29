<template>
    <v-container>

        <v-card v-if="isLoaded">
            <v-card-title class="text-center justify-center py-1">
                <h1 class="font-weight-bold display-1 basil--text">Приложения к закону о Бюджете</h1>
            </v-card-title>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card flat>
                        <v-card-text>
                            <Table :type="item"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
    import Table from "@/components/Table";

    export default {
        data() {
            return {
                tab: null,
                items: ['Функциональная структура расходов', 'Ведомственная структура расходов',],
            }
        },
        components: {
            Table,
        },
        computed: {
            isLoaded() {
                return this.$store.getters.isLoaded;
            },
        },
    }
</script>

<style>
    /* Helper classes */
    .basil {
        background-color: #FFFBE6 !important;
    }

    .basil--text {
        color: #356859 !important;
    }
</style>