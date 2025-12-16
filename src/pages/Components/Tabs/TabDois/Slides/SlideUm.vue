<template>
  <div class="absolute-bottom custom-caption">
    <div :class="formatSizes('text')" v-if="title">{{ title }}</div>
    <div class="text-subtitle2" v-if="description">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import { type Slide } from 'src/util/Interface';

import useFormat from 'src/composables/useFormat';

const { formatSizes } = useFormat();

withDefaults(defineProps<Slide>(), {
  title: 'AAAA',
  description: 'AUIAIOAIJOIAOA',
})

defineOptions({
  name: 'SlideUm',
})

</script>
