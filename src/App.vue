<template>
    <v-app>
        <FileInput />
        <KBK_Select />
        <ReportList />
<!--        <HeaderFile />-->
    </v-app>
</template>

<script>
    import FileInput from "./components/FileInput";
    import ReportList from "./components/ReportList";
    import KBK_Select from "./components/KBK_Select";

    export default {
        name: 'App',
        data() {
            return {
            }
        },
        components: {
            FileInput,
            ReportList,
            KBK_Select,
        },
        methods: {
        },
    };
</script>
