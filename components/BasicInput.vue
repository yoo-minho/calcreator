<script setup lang="ts">
const q = defineModel();

type BaseInputType = {
  label?: string;
  help?: string;
  trailing: string;
  type?: string;
  disabled?: boolean;
  horizon?: boolean;
};

defineProps<BaseInputType>();
</script>
<template>
  <div :class="{ flex: horizon, 'items-center': horizon }">
    <div style="width: 60vw" class="mb-2">
      <BasicLabel v-if="label" :title="label" :help="help">
        <template #tooltip v-if="$slots.tooltip">
          <slot name="tooltip" />
        </template>
      </BasicLabel>
    </div>
    <div class="flex-1">
      <UInput
        v-model="q"
        color="gray"
        variant="outline"
        :type="type"
        input-class="text-right"
        size="xl"
        :disabled="disabled"
      >
        <template #trailing v-if="trailing"> {{ trailing }} </template>
      </UInput>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
