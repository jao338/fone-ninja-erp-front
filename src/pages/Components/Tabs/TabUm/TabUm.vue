<template>
  <div class="row justify-center items-center">
    <div class="row justify-center items-center q-col-gutter-md q-pa-md col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <div class="flex justify-center items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
        <ButtonGeneric :size="formatSizes('button')" label="Play" color="primary" @click="play" />
      </div>

      <div class="flex justify-center items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
        <ButtonGeneric :size="formatSizes('button')" label="Pause" color="warning" @click="pause" />
      </div>

      <div class="flex justify-center items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
        <ButtonGeneric :size="formatSizes('button')" label="Stop" color="negative" @click="stop" />
      </div>

      <div class="flex justify-center items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
        <ButtonGeneric :size="formatSizes('button')" label="Reverse" color="secondary" @click="reverse" />
      </div>

    </div>
    <div class="flex justify-center items-center col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <VueLottie
        ref="lottieRef"
        :animation-data="animation"
        :height="200"
        :width="200"
        :loop="true"
        :speed="1"
        @onAnimationLoaded="isReady = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import ButtonGeneric from 'components/buttons/ButtonGeneric.vue';
import VueLottie from 'components/utils/VueLottie.vue';
import animation from 'assets/animations/checkbox.json';

import { type LottieInstance } from 'src/util/Interface';

import useFormat from 'src/composables/useFormat';

const { formatSizes } = useFormat();

const lottieRef = ref<LottieInstance | null>(null);
const isReady = ref(false);
const duration = ref<number | null>(null);

function play() {
  lottieRef.value?.play();
}
function pause() {
  lottieRef.value?.pause();
}
function stop() {
  lottieRef.value?.stop();
}
function reverse() {
  lottieRef.value?.setDirection('reverse');
  lottieRef.value?.play();
}

onMounted(() => {
  if (lottieRef.value) {
    duration.value = lottieRef.value.getDuration();
  }
});

defineOptions({
  name: 'TabUm',
})
</script>
