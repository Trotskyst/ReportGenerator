function GetObjectToPush(number, name, code1, code2, array) {
    let array_of_sum = SumFromArray(array);
    let formatter = new Intl.NumberFormat("ru");
    return {
        "number": number,
        "name": name,
        "code1": code1,
        "code2": code2,
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

export function GetTable(obj) {
    const table = [];
    const array_razdel = [...new Set(obj.file.map(item => item.razdel_code))].sort();
    let i1 = 0;
    for (const razdel_code of array_razdel) {
        const array = obj.file.filter(function (e) {
            return e.razdel_code === razdel_code;
        });
        i1++;
        let i2 = 0;
        table.push(GetObjectToPush(
            i1.toString(),
            obj.file.find(element => element.razdel_code === razdel_code).razdel_name,
            razdel_code.slice(0, 2),
            '',
            array)
        );

        let array_podr = [...new Set(array.map(t => t.podr_code))].sort();
        for (const podr_code of array_podr) {
            const array2 = array.filter(function (e) {
                return e.podr_code === podr_code;
            });
            i2++;
            table.push(GetObjectToPush(
                i1.toString() + '.' + i2.toString(),
                array.find(element => element.podr_code === podr_code).podr_name,
                podr_code.slice(0, 2),
                podr_code.slice(-2),
                array2)
            );
        }
    }


    table.push(GetObjectToPush(
        "", "Всего расходов", "",'',
        obj.file)
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
