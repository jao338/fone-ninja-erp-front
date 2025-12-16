<template>
  <div class="row q-gutter-md items-center justify-center">
    <div class="text-center flex justify-center col-xl-5 col-lg-5 col-md-5 col-xs-12 col-sm-12">
      <span>{{ t('infoGsap') }}</span>
    </div>
    <div class="flex-center col-xl-5 col-lg-5 col-md-5 col-xs-12 col-sm-12 overflow-hidden">
      <div class="flex-center" style="height: 200px">
        <img src="~src/assets/images/bit.jpg"  ref="bit"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { exampleAnimation } from './Util/TabTresService';
import { useI18n } from 'vue-i18n';

const bit = ref<HTMLElement | null>(null);

const { t } = useI18n();

onMounted(() => {
  exampleAnimation(bit.value);
})

defineOptions({
  name: 'TabTres',
})
</script>
