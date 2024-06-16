<script setup lang="ts">
import CalMethodBanner from "./CalMethodBanner.vue";

type CourseItem = {
  instructor: {
    name: string;
  };
  course: {
    title: string;
    studentCount: number;
    slug: string;
    metadata: { skills: string[] };
  };
  payment: {
    regularPrice: number;
  };
};

const props = defineProps<{ id: number }>();

const { data } = await useFetch<{ data: { items: CourseItem[] } }>(
  `https://www.inflearn.com/users/api/ucc/api/v2/course/user/${props.id}?pageNumber=1&pageSize=100&sort=RECENT`
);
const items = data.value?.data.items || [];

const instructor = items[0].instructor.name;

const calItems = items
  .map((item: CourseItem) => {
    return {
      title: item.course.title,
      studentCount: item.course.studentCount,
      regularPrice: item.payment.regularPrice,
      courseId: item.course.slug,
      sales: item.course.studentCount * item.payment.regularPrice,
      skills: item.course.metadata.skills,
    };
  })
  .sort((a, b) => b.sales - a.sales);

const get예상수익 = (price: number) => price * 0.4;

const totalSales = Math.round(
  get예상수익(calItems.reduce((acc: number, curr: { sales: number }) => acc + curr.sales, 0))
);

const totalSkills = {} as { [key: string]: number };
calItems.forEach((cal) => {
  cal.skills.forEach((skill) => {
    totalSkills[skill] = (totalSkills[skill] || 0) + 1;
  });
});
const _totalSkills = Object.entries<number>(totalSkills)
  .filter(([_, v]) => v > 1)
  .sort((_a, _b) => _b[1] - _a[1])
  .map(([k]) => k)
  .splice(0, 6);

function formatNumberKR(num: number) {
  if (num < 10000) return 0;
  if (num < 100000000) {
    const man = Math.floor(num / 10000).toLocaleString("ko-KR");
    return `${man}만 원`;
  } else {
    const uk = Math.floor(num / 100000000).toLocaleString("ko-KR");
    const man = Math.floor((num % 100000000) / 10000).toLocaleString("ko-KR");
    return `${uk}억 ${man ? man + "만" : ""} 원`;
  }
}

const clickCourse = (id: string) => {
  window.open(`https://www.inflearn.com/course/${id}`, id + "");
};

const formatPriceLabel = (price: number) => {
  if (price === 0) return "무료";
  return formatNumberKR(price);
};

const title = `${instructor} 님의`;
const title2 = "인프런 예상 수익은?";
const desc = "내가 좋아하는, 관심 있는, 수강한 인프런\n지식공유자님의 누적 예상 수익을 알려드립니다.";

useSeoMeta({
  title: `${title} ${title2}`,
  ogTitle: `${title} ${title2}`,
  description: desc,
  ogDescription: desc,
  twitterCard: "summary_large_image",
});

defineOgImageComponent("LandingHero", {
  title: title,
  title2: title2,
  colorCode: "rgb(34,197,94)",
  desc: desc,
  chip: "🌱💵👊",
});
</script>

<template>
  <div class="w-full flex flex-col flex-wrap">
    <div class="max-w-full">
      <div>
        <div class="text-3xl font-bold">{{ instructor }}</div>
        <div class="flex gap-1 items-center">
          <div class="font-bold text-primary">예상수익 : {{ formatPriceLabel(totalSales) }}</div>
          <CalMethodBanner class="text-md" />
        </div>

        <div class="my-3">
          <div class="text-sm">전체 강의수 : {{ items.length }}</div>
          <div class="flex gap-1 flex-wrap" v-if="_totalSkills.length > 0">
            <UBadge v-for="s in _totalSkills" :label="s" color="gray" size="xs" />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-full">
      <template v-for="(cal, idx) in calItems">
        <UCard
          class="mb-3 max-w-full cursor-pointer"
          :ui="{ body: { padding: 'p-3 sm:px-3 sm:py-2' } }"
          @click="clickCourse(cal.courseId)"
        >
          <div class="flex flex-col gap-1 items-start">
            <span class="truncate max-w-full">
              <UIcon name="i-ph-leaf-duotone" size="0.8rem" />
              <span>{{ idx + 1 }}. {{ cal.title }}</span>
            </span>
            <div class="flex gap-1">
              <UBadge size="xs" class="text-[11px]">{{ formatPriceLabel(get예상수익(cal.sales)) }}</UBadge>
              <UBadge size="xs" class="text-[11px]" color="gray">{{ cal.studentCount.toLocaleString() }}명 </UBadge>
            </div>
          </div>
        </UCard>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
