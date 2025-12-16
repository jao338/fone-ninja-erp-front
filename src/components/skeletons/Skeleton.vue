<template>
  <div>
    <q-skeleton height="50px" style="border-radius: 16px" :type="props.type" />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<
      | 'QInput'
      | 'QAvatar'
      | 'QBadge'
      | 'QBtn'
      | 'QCheckbox'
      | 'QChip'
      | 'QRadio'
      | 'QRange'
      | 'QSlider'
      | 'QToggle'
      | 'QToolbar'
      | 'circle'
      | 'rect'
      | 'text'
    >,
    default: 'QInput',
  },
});

defineOptions({
  name: 'Skeleton',
});
</script>
