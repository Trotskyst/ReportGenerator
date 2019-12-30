<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" outlined>
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Загрузка файла</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="pb-0">
                        <v-file-input
                                show-size
                                outlined
                                :rules="rules"
                                accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                prepend-icon="mdi-file-excel"
                                placeholder="Выбор файла"
                                label="Excel-файл"
                                v-model="file"
                        >
                        </v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                :disabled="!file"
                                depressed
                                color="primary" @click="submitFile">Загрузить
                        </v-btn>
                    </v-card-actions>

                    <v-dialog
                            v-model="loadingDialog"
                            persistent
                            width="300"
                    >
                        <v-card
                                color="primary"
                                dark
                        >
                            <v-card-text>
                                Загрузка данных
                                <v-progress-linear
                                        indeterminate
                                        color="white"
                                        class="mb-0"
                                ></v-progress-linear>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                </v-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <a href="https://github.com/Trotskyst/ReportGenerator/raw/master/example.xlsx" download>Скачать пример файла</a>
        </v-row>
    </v-container>
</template>

<script>
    import XLSX from 'xlsx';
    import {mapMutations} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {
                loadingDialog: false,
                file: null,
                rules: [
                    value => !value || value.size < 20 * 1024 * 1024 || 'Размер файла не должен превышать 20 мегабайт!',
                ],
            }
        },
        methods: {
            ...mapMutations(["loadFile"]),
            submitFile() {
                this.loadingDialog = true;

                let reader = new FileReader();
                let workbook = null;
                reader.readAsArrayBuffer(this.file);

                reader.onload = async () => {
                    let data = new Uint8Array(reader.result);
                    let arr = [];
                    for (var i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                    workbook = XLSX.read(arr.join(""), {type: "binary"});
                    this.loadFile(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {raw: true}));
                    this.loadingDialog = false;
                };
            }
        },
    };
</script>
