<template>
  <DefaultCarousel
    v-model="carousel"
    :slides="slides"
    arrows
    :autoplay="true"
    :loop="true"
    type="flat"
  />
</template>

<script setup lang="ts">
import DefaultCarousel from 'components/carousels/DefaultCarousel.vue';

import { defineAsyncComponent, ref } from 'vue';
import { type Slide } from 'src/util/Interface';

const SlideUm = defineAsyncComponent(() => import('./Slides/SlideUm.vue'));
const SlideDois = defineAsyncComponent(() => import('./Slides/SlideDois.vue'));

const carousel = ref<number>(0);
const slides = ref<Slide[]>([
  {
    component: SlideUm,
    img: 'https://i.pinimg.com/originals/b6/f0/75/b6f075f2eef2d317ea78881aa1597965.jpg',
    title: 'Hipopotamizinhozinho',
    description: 'Filhote de hipopótamo',
  },
  {
    component: SlideDois,
    img: 'https://wallpapers.com/images/hd/cute-bat-pictures-5fo1q6ubrh1w6z1e.jpg',
    title: 'Gatão',
    description: 'É um gato',
  },
])

defineOptions({
  name: 'TabDois',
});

</script>
