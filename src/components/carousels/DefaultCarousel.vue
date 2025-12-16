<template>
  <q-carousel
    class="q-border-radius abc"
    :model-value="modelValue"
    :arrows="arrows"
    :swipeable="swipeable"
    :infinite="loop"
    :autoplay="autoplay"
    :control-type="type"
    @update:model-value="(val) => emits('update:modelValue', val)"
  >
    <q-carousel-slide
      v-for="(slide, index) in slides"
      :key="index"
      :name="index"
      :img-src="slide.img"
    >
      <component
        v-if="slide.component"
        :is="slide.component"
        :title="slide.title"
        :description="slide.description"
      />
      <div v-else class="custom-caption" :class="returnAbsoluteAlign(captionPosition ?? 'bottom')">
        <div :class="formatSizes('text')">{{ slide.title }}</div>
        <div class="text-subtitle2" v-if="slide.description">{{ slide.description }}</div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { type DefaultCarousel } from 'src/util/Interface';

import useHelpers from 'src/composables/useHelpers';
import useFormat from 'src/composables/useFormat';

const { returnAbsoluteAlign } = useHelpers();
const { formatSizes } = useFormat();

withDefaults(defineProps<DefaultCarousel>(), {
  type: 'flat',
  arrows: true,
  swipeable: true,
  loop: true,
  autoplay: false,
  captionPosition: 'bottom',
  slides: () => []
});

const emits = defineEmits(['update:modelValue']);

</script>
