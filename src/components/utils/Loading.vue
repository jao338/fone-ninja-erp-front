<template>
  <q-inner-loading :showing="modelValue" @update:model-value="(val: boolean) => emits('update:modelValue', val)">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
  },
});

defineOptions({
  name: 'Loading',
});

const emits = defineEmits(['update:modelValue']);
</script>
