<template>
    <n-card title="Airplane list">
        <n-table :single-line="false" size="small" :pagination="pagination" :striped="true">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Тип</th>
                    <th>Рейс</th>
                    <th>Аэропорт</th>
                    <th>BC</th>
                    <th>План</th>
                    <th>Расписание</th>
                    <th>Фактический</th>
                    <th>Статус</th>
                    <th>Стойки/Вылет</th>
                    <th>Багаж/Прилет</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td style="width: 100px;"><n-select v-model:value="filter.movement" :options="options" placeholder="Тип"
                            :consistent-menu-width="false" /></td>
                    <td style="width: 90px;"><n-input v-model:value="filter.aircompany" type="text" placeholder="Рейс" /></td>
                    <td style="width: 90px;"><n-input v-model:value="filter.airport" type="text" placeholder="Аэропорт" /></td>
                    <td style="width: 90px;"><n-input v-model:value="filter.aircrafttype" type="text" placeholder="BC" /></td>
                    <td style="min-width: 150px;"><n-input v-model:value="filter.plan" type="text" placeholder="План" /></td>
                    <td style="min-width: 150px;"><n-input v-model:value="filter.sched" type="text" placeholder="Расписание" /></td>
                    <td style="min-width: 150px;"><n-input v-model:value="filter.fact" type="text" placeholder="Фактический" /></td>
                    <td style="width: 100px;"><n-input v-model:value="filter.flight_status" type="text" placeholder="Статус" /></td>
                    <td style="min-width: 150px;"><n-input v-model:value="filter.check_in" type="text" placeholder="Стойки/Вылет" /></td>
                    <td></td>
                </tr>
                <tr v-for="(item, index) in paginatedList" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.movement == 'DEPARTURE' ? 'Uchib ketish' : 'Uchib kelish' }}</td>
                    <td>{{ item.aircompany }} {{ item.flightnumber }}</td>
                    <td>{{ item.airport }}</td>
                    <td>{{ item.aircrafttype }}</td>
                    <td>{{ item.plan }}</td>
                    <td>{{ item.sched }}</td>
                    <td>{{ item.fact }}</td>
                    <td>{{ item.flight_status }}</td>
                    <td>{{ item.check_in.plan }}</td>
                    <td>{{ item.movement == 'DEPARTURE' ? 'стойка' : 'багаж' }}</td>
                </tr>
            </tbody>
        </n-table>
        <template #action>
            <n-flex justify="space-between">
                Jami: {{ filteredList.length }} ta
                <n-pagination v-model:page="page" :page-count="Math.ceil(filteredList.length / pagination.pageSize)" />
            </n-flex>
        </template>
    </n-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            air_lists: [],
            page: 1,
            pagination: {
                pageSize: 20
            },
            filter: {
                movement: "",
                aircompany: null,
                airport: null,
                aircrafttype: null,
                plan: null,
                sched: null,
                fact: null,
                flight_status: null,
                check_in: null,
            },
            options: [
                {
                    label: 'Hammasi',
                    value: '',
                },
                {
                    label: 'Uchib ketish',
                    value: 'DEPARTURE',
                },
                {
                    label: 'Uchib kelish',
                    value: 'ARRIVAL',
                },
            ],
        };
    },
    created() {
        this.getAeroData();
        setInterval(() => {
            this.getAeroData();
        }, 60000);
    },
    computed: {
        filteredList() {
            return this.air_lists?.filter(item => {
                const movement = this.filter.movement ? item.movement?.toLowerCase().includes(this.filter.movement.toLowerCase()) : true;
                const aircompany = this.filter.aircompany ? item.aircompany?.toLowerCase().includes(this.filter.aircompany.toLowerCase()) : true;
                const airport = this.filter.airport ? item.airport?.toLowerCase().includes(this.filter.airport.toLowerCase()) : true;
                const aircrafttype = this.filter.aircrafttype ? item.aircrafttype?.toLowerCase().includes(this.filter.aircrafttype.toLowerCase()) : true;
                const plan = this.filter.plan ? item.plan?.toLowerCase().includes(this.filter.plan.toLowerCase()) : true;
                const sched = this.filter.sched ? item.sched?.toLowerCase().includes(this.filter.sched.toLowerCase()) : true;
                const fact = this.filter.fact ? item.fact?.toLowerCase().includes(this.filter.fact.toLowerCase()) : true;
                const flight_status = this.filter.flight_status ? item.flight_status?.toLowerCase().includes(this.filter.flight_status.toLowerCase()) : true;
                const check_in = this.filter.check_in ? item.check_in?.toLowerCase().includes(this.filter.check_in.toLowerCase()) : true;
                return movement && aircompany && airport && aircrafttype && plan && sched && fact && flight_status && check_in;
            }) || [];
        },
        paginatedList() {
            const start = (this.page - 1) * this.pagination.pageSize;
            return this.filteredList.slice(start, start + this.pagination.pageSize);
        },
    },
    methods: {
        getAeroData() {
            axios
                .get('https://bot.uzairports.com/api/fids?airport_code=TAS&flight_type=DEPARTURE')
                .then(response => {
                    this.air_lists = response.data.flights;
                });
        },
    },
};
</script>
