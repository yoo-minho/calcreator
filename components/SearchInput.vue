<script setup lang="ts">
const q = defineModel();
</script>
<template>
    <UInput v-model="q" name="q" placeholder="지식공유자의 이름을 검색해보세요" icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off" input-class="focus:border-green-500" :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
            <UButton v-show="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
                @click="q = ''" />
        </template>
    </UInput>
</template>
