<template>
    <div class="container" v-if="isLoaded">
        <h2>Фильтр</h2>

        <div class="row">
            <KBK_Filter :type="filter_type_departments"/>
            <KBK_Filter :type="filter_type_divisions"/>
            <KBK_Filter :type="filter_type_targetitems"/>
        </div>
    </div>

</template>

<script>
    import KBK_Filter from './KBK_Filter'

    export default {
        data() {
            return {
                filter_type_departments: 'departments',
                filter_type_divisions: 'divisions',
                filter_type_targetitems: 'targetitems',
            }
        },
        components: {
            KBK_Filter,
        },
        computed: {
            isLoaded() {
                return this.$store.getters.isLoaded;
            },
        },
    }
</script>

<style scoped>
    .row {
        width: 100%;
        margin-top: 10px;
    }
</style>
