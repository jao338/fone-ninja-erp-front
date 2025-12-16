<template>
  <q-radio
    class="q-mr-md q-mt-xs"
    :class="{
      'text-grey-5': $q.dark.isActive,
      'text-grey-9': !$q.dark.isActive,
    }"
    v-for="(option, index) in options"
    :data-cy="`input-radio-${index}`"
    :key="index"
    :model-value="modelValue"
    @update:model-value="(val) => emits('update:modelValue', val)"
    :val="option.val"
    :label="option.label"
    :readonly="readonly"
    :color="option.color"
    dense
  />
</template>

<script setup lang="ts">
import { type RadioOptions } from 'src/util/Interface';

defineOptions({
  name: 'InputRadio',
});

defineProps({
  modelValue: [String, Boolean, Number],
  options: {
    type: Array as () => RadioOptions[],
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']);
</script>
