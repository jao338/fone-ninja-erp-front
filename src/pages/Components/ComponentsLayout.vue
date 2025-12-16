<template>
  <q-page class="q-pa-lg">
    <div class="row justify-between items-center">
      <TitleH4 :title="$t('componentes')" :caption="$t('componentesCaption')" class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12"/>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 column" :class="$q.screen.gt.xs ? 'items-end' : ''">
        <Breadcrumb v-if="$q.screen.gt.xs"/>
      </div>
    </div>
    <div class="q-my-lg">
      <router-view />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TitleH4 from 'components/titles/TitleH4.vue';
import Breadcrumb from 'components/utils/Breadcrumb.vue';

import { useI18n } from 'vue-i18n';
import { useMeta } from 'quasar';

const { t } = useI18n()

useMeta(() => {
  return {
    title: t('componentesExemplo'),
  };
});

defineOptions({
  name: 'ComponentsLayout',
});

</script>
