<script setup lang="ts">
const q = defineModel();

type BaseInputType = {
  label?: string;
  help?: string;
  trailing: string;
  type?: string;
  disabled?: boolean;
};

defineProps<BaseInputType>();
</script>
<template>
  <div>
    <BasicLabel v-if="label" :title="label" :help="help">
      <template #tooltip v-if="$slots.tooltip">
        <slot name="tooltip" />
      </template>
    </BasicLabel>
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
</template>

<style lang="scss" scoped></style>
