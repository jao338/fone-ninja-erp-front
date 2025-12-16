<template>
  <q-slider
    :model-value="modelValue"
    @update:model-value="(val) => emits('update:modelValue', val)"
    dense
    :min="minValue"
    :max="maxValue"
    :step="stepValue"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'InputSlider',
});

defineProps({
  modelValue: Number,
  label: {
    type: String,
    required: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  minValue: {
    type: Number,
    default: 0
  },
  maxValue: {
    type: Number,
    default: 100
  },
  stepValue: {
    type: Number,
    default: 10
  },
});

const emits = defineEmits(['update:modelValue', 'toggleIsPwd']);
</script>
