<template>
    <n-card title="Airplane list">
        <n-table :single-line="false" size="small" :pagination="pagination">
            <thead>
                <tr>
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
                    <td><n-select v-model:value="filter.movement" :options="options" placeholder="Тип"
                            :consistent-menu-width="false" /></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><n-input v-model:value="filter.plan" type="text" placeholder="План" /></td>
                    <td><n-input v-model:value="filter.sched" type="text" placeholder="Расписание" /></td>
                    <td><n-input v-model:value="filter.fact" type="text" placeholder="Фактический" /></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr v-for="(item, index) in paginatedList" :key="index">
                    <td>{{ item.movement == 'DEPARTURE' ? 'Uchib ketish' : 'Uchib kelish' }}</td>
                    <td>{{ item.aircompany }}</td>
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
            air_lists: null,
            page: 1,
            pagination: {
                pageSize: 50
            },
            filter: {
                movement: null,
                plan: null,
                sched: null,
                fact: null,
            },
            options: [
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
                const filterMovement = this.filter.movement ? item.movement?.toLowerCase().includes(this.filter.movement.toLowerCase()) : true;
                const filterPlan = this.filter.plan ? item.plan?.toLowerCase().includes(this.filter.plan.toLowerCase()) : true;
                const filterSched = this.filter.sched ? item.sched?.toLowerCase().includes(this.filter.sched.toLowerCase()) : true;
                const filterFact = this.filter.fact ? item.fact?.toLowerCase().includes(this.filter.fact.toLowerCase()) : true;
                return filterMovement && filterPlan && filterSched && filterFact;
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
