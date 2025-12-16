<template>
  <q-pagination
    :model-value="modelValue"
    :max="max"
    :max-pages="maxPages"
    :ellipses="ellipses"
    :direction-links="directionLinks"
    :boundary-links="boundaryLinks"
    :boundary-numbers="boundaryNumbers"
    :disable="disable"
    flat
    class="q-mt-md q-mb-xl float-right"
    ref="pagination"
    color="grey"
    active-color="primary"
    @update:model-value="(val) => emits('update:modelValue', val)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QPagination } from 'quasar';

defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    required: true,
  },
  maxPages: {
    type: [Number, String],
    required: false,
    default: 8,
  },
  ellipses: {
    type: Boolean,
    default: true,
    required: false
  },
  boundaryNumbers: {
    type: Boolean,
    default: true,
    required: false
  },
  directionLinks: {
    type: Boolean,
    default: true,
    required: false
  },
  boundaryLinks: {
    type: Boolean,
    default: true,
    required: false
  },
  disable: {
    type: Boolean,
    default: false,
    required: false
  }
})

const pagination = ref<InstanceType<typeof QPagination> | null>(null)

const emits = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()
</script>
