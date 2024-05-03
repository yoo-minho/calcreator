<script setup lang='ts'>
type CourseItem = {
    instructor: {
        name: string;
    },
    course: {
        title: string;
        studentCount: number;
        metadata: { skills: string[] }
    },
    payment: {
        regularPrice: number;
    }
}

const props = defineProps<{ id: number }>();

const { data } = await useFetch<{ data: { items: CourseItem[] } }>(`https://www.inflearn.com/users/api/ucc/api/v2/course/user/${props.id}?pageNumber=1&pageSize=100&sort=RECENT`);
const items = data.value?.data.items || [];

const instructor = items[0].instructor.name;

const calItems = items.map((item: CourseItem) => {
    return {
        title: item.course.title,
        studentCount: item.course.studentCount,
        regularPrice: item.payment.regularPrice,
        sales: item.course.studentCount * item.payment.regularPrice,
        skills: item.course.metadata.skills,
    }
}).sort((a, b) => b.sales - a.sales);

const totalSales = Math.round(calItems.reduce((acc: number, curr: { sales: number }) => {
    return acc + curr.sales
}, 0) * 0.7 * 0.967);

const totalSkills = {} as { [key: string]: number };
calItems.forEach(cal => {
    cal.skills.forEach(skill => {
        totalSkills[skill] = (totalSkills[skill] || 0) + 1;
    })
})
const _totalSkills = Object.entries<number>(totalSkills)
    .filter(([_, v]) => v > 1)
    .sort((_a, _b) => _b[1] - _a[1])
    .map(([k]) => k)
    .splice(0, 6);


function formatNumberKR(num: number) {
    if (num < 10000) return 0;
    if (num < 100000000) {
        const man = Math.floor(num / 10000).toLocaleString('ko-KR');
        return `${man}만 원`;
    } else {
        const uk = Math.floor(num / 100000000).toLocaleString('ko-KR');
        const man = Math.floor((num % 100000000) / 10000).toLocaleString('ko-KR');
        return `${uk}억 ${man ? man + '만' : ''} 원`;
    }
}

const clickUser = (id: number) => {
    window.open(`https://www.inflearn.com/users/${id}`, id + '');
}
</script>

<template>
    <UCard @click="clickUser(id)" class="hover:bg-gray-100 cursor-pointer">
        <template #header>
            <div class="flex justify-between items-center">
                <div class="text-3xl font-bold">{{ instructor }}</div>
                <div class="text-right">
                    <div class="font-bold text-green-500">예상수익 : {{ formatNumberKR(totalSales) }}</div>
                    <div class="text-sm">전체 강의수 : {{ items.length }}</div>
                </div>
            </div>
        </template>

        <template v-for="cal in calItems.splice(0, 3)">
            <div>
                <div>{{ cal.title }}</div>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-1">
                <UBadge v-for="s in _totalSkills" :label="s" color="gray" />
            </div>
        </template>
    </UCard>
</template>

<style lang='scss' scoped></style>
