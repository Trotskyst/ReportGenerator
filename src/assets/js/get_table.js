function ObjectFilter(obj, filter_departments, filter_divisions, filter_targetitems) {
    if (filter_departments.length > 0)
        obj = obj.filter(e => filter_departments.includes(e.ved_code));
    if (filter_divisions.length > 0)
        obj = obj.filter(e => filter_divisions.includes(e.podr_code));
    if (filter_targetitems.length > 0)
        obj = obj.filter(e => filter_targetitems.includes(e.cs_code));
    return obj;
}

function ObjectToPush(number, name, code1, code2, code3, code4, code5, array) {
    let array_of_sum = SumFromArray(array);
    let formatter = new Intl.NumberFormat("ru");
    return {
        "number": number,
        "name": name,
        "code1": code1,
        "code2": code2,
        "code3": code3,
        "code4": code4,
        "code5": code5,
        "sum11": formatter.format(array_of_sum.sum11),
        "sum12": formatter.format(array_of_sum.sum12),
        "sum13": formatter.format(array_of_sum.sum13),
    }
}

function SumFromArray(array) {
    return {
        "sum11": array.reduce(function (acc, m) {
            return acc + m.sum11;
        }, 0).toFixed(1),
        "sum12": array.reduce(function (acc, m) {
            return acc + m.sum12;
        }, 0).toFixed(1),
        "sum13": array.reduce(function (acc, m) {
            return acc + m.sum13;
        }, 0).toFixed(1),
    }
}

export function Table_Functional_Structure(obj, filter_departments, filter_divisions, filter_targetitems) {
    obj = ObjectFilter(obj, filter_departments, filter_divisions, filter_targetitems);
    const table = [];
    const array_razdel = [...new Set(obj.map(item => item.razdel_code))].sort();
    let i1 = 0;
    for (const razdel_code of array_razdel) {
        const array = obj.filter(function (e) {
            return e.razdel_code === razdel_code;
        });
        i1++;
        let i2 = 0;
        table.push(ObjectToPush(
            i1.toString(),
            obj.find(element => element.razdel_code === razdel_code).razdel_name,
            razdel_code.slice(0, 2),
            '',
            '',
            '',
            '',
            array)
        );

        let array_podr = [...new Set(array.map(t => t.podr_code))].sort();
        for (const podr_code of array_podr) {
            const array2 = array.filter(function (e) {
                return e.podr_code === podr_code;
            });
            i2++;
            table.push(ObjectToPush(
                i1.toString() + '.' + i2.toString(),
                array.find(element => element.podr_code === podr_code).podr_name,
                podr_code.slice(0, 2),
                podr_code.slice(-2),
                '',
                '',
                '',
                array2)
            );
        }
    }


    table.push(ObjectToPush(
        "", "Всего расходов", "", '', '', '', '',
        obj)
    );

    const result_table = [];
    for (let i = 0; i < table.length; i++) {
        result_table.push([
            {'class': 'text-center', "value": table[i]["number"]},
            {'class': 'text-left', "value": table[i]["name"]},
            {'class': 'text-center', "value": table[i]["code1"]},
            {'class': 'text-center', "value": table[i]["code2"]},
            {'class': 'text-right', "value": table[i]["sum11"]},
            {'class': 'text-right', "value": table[i]["sum12"]},
            {'class': 'text-right', "value": table[i]["sum13"]},
        ]);
    }

    return {
        "header": [
            {"text": "N", "value": "number"},
            {"text": "Наименование", "value": "name"},
            {"text": "Раздел", "value": "code1"},
            {"text": "Подраздел", "value": "code2"},
            {"text": "Действующий бюджет", "value": "sum11"},
            {"text": "Поправка", "value": "sum12"},
            {"text": "Итог", "value": "sum13"},
        ],
        "table": result_table,
        "table_name": 'Функциональная структура расходов',
    };
}


export function Table_Department_Structure(obj, filter_departments, filter_divisions, filter_targetitems) {
    obj = ObjectFilter(obj, filter_departments, filter_divisions, filter_targetitems);
    const table = [];
    const array_ved = [...new Set(obj.map(item => item.ved_code))].sort();
    let i1 = 0;
    for (const ved_code of array_ved) {
        const array = obj.filter(function (e) {
            return e.ved_code === ved_code;
        });
        i1++;
        table.push(ObjectToPush(
            i1.toString(),
            obj.find(element => element.ved_code === ved_code).ved_name,
            ved_code,
            '',
            '',
            '',
            '',
            array)
        );

        let array_razdel = [...new Set(array.map(t => t.razdel_code))].sort();
        for (const razdel_code of array_razdel) {
            const array2 = array.filter(function (e) {
                return e.razdel_code === razdel_code;
            });
            table.push(ObjectToPush(
                '',
                array.find(element => element.razdel_code === razdel_code).razdel_name,
                ved_code,
                razdel_code.slice(0, 2),
                '',
                '',
                '',
                array2)
            );


            let array_podr = [...new Set(array2.map(t => t.podr_code))].sort();
            for (const podr_code of array_podr) {
                const array3 = array2.filter(function (e) {
                    return e.podr_code === podr_code;
                });
                table.push(ObjectToPush(
                    '',
                    array2.find(element => element.podr_code === podr_code).podr_name,
                    ved_code,
                    podr_code.slice(0, 2),
                    podr_code.slice(-2),
                    '',
                    '',
                    array3)
                );

                let array_cs2 = [...new Set(array3.map(t => t.cs2_code))].sort();
                for (const cs2_code of array_cs2) {
                    const array4 = array3.filter(function (e) {
                        return e.cs2_code === cs2_code;
                    });
                    table.push(ObjectToPush(
                        '',
                        array3.find(element => element.cs2_code === cs2_code).cs2_name,
                        ved_code,
                        podr_code.slice(0, 2),
                        podr_code.slice(-2),
                        cs2_code,
                        '',
                        array4)
                    );

                    let array_cs10 = [...new Set(array4.map(t => t.cs_code))].sort();
                    for (const cs_code of array_cs10) {
                        const array5 = array4.filter(function (e) {
                            return e.cs_code === cs_code;
                        });
                        table.push(ObjectToPush(
                            '',
                            array4.find(element => element.cs_code === cs_code).cs_name,
                            ved_code,
                            podr_code.slice(0, 2),
                            podr_code.slice(-2),
                            cs_code,
                            '',
                            array5)
                        );

                        let array_vr = [...new Set(array5.map(t => t.vr_code))].sort();
                        for (const vr_code of array_vr) {
                            const array6 = array5.filter(function (e) {
                                return e.vr_code === vr_code;
                            });
                            table.push(ObjectToPush(
                                '',
                                array5.find(element => element.vr_code === vr_code).vr_name,
                                ved_code,
                                podr_code.slice(0, 2),
                                podr_code.slice(-2),
                                cs_code,
                                vr_code,
                                array6)
                            );
                        }

                    }
                }
            }
        }
    }


    table.push(ObjectToPush(
        "", "Всего расходов", "", '', '', '', '',
        obj)
    );

    const result_table = [];
    for (let i = 0; i < table.length; i++) {
        result_table.push([
            {'class': 'text-center', "value": table[i]["number"]},
            {'class': 'text-left', "value": table[i]["name"]},
            {'class': 'text-center', "value": table[i]["code1"]},
            {'class': 'text-center', "value": table[i]["code2"]},
            {'class': 'text-center', "value": table[i]["code3"]},
            {'class': 'text-center', "value": table[i]["code4"]},
            {'class': 'text-center', "value": table[i]["code5"]},
            {'class': 'text-right', "value": table[i]["sum11"]},
            {'class': 'text-right', "value": table[i]["sum12"]},
            {'class': 'text-right', "value": table[i]["sum13"]},
        ]);
    }

    return {
        "header": [
            {"text": "N", "value": "number"},
            {"text": "Наименование", "value": "name"},
            {"text": "Ведомство", "value": "code1"},
            {"text": "Раздел", "value": "code2"},
            {"text": "Подраздел", "value": "code3"},
            {"text": "Целевая статья", "value": "code4"},
            {"text": "Вид расходов", "value": "code5"},
            {"text": "Действующий бюджет", "value": "sum11"},
            {"text": "Поправка", "value": "sum12"},
            {"text": "Итог", "value": "sum13"},
        ],
        "table": result_table,
        "table_name": 'Ведомственная структура расходов',
    };
}
