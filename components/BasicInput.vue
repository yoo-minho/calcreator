<script setup lang="ts">
const number = defineModel<number>();

type BaseInputType = {
  label?: string;
  help?: string;
  trailing?: string;
  type?: string;
  disabled?: boolean;
  horizon?: boolean;
};

defineProps<BaseInputType>();
</script>
<template>
  <div :class="{ flex: horizon, 'items-center': horizon }">
    <div :style="{ width: horizon ? '60%' : '' }" class="mb-2">
      <BasicLabel v-if="label" :title="label" :help="help">
        <template #tooltip v-if="$slots.tooltip">
          <slot name="tooltip" />
        </template>
      </BasicLabel>
    </div>
    <div class="flex-1 flex items-center gap-3">
      <UInput
        v-model="number"
        color="gray"
        variant="outline"
        :type="type"
        input-class="text-right"
        size="xl"
        :disabled="disabled"
        class="flex-1"
        :trailing="false"
      />
      <div class="font-bold tracking-tighter">{{ trailing }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
