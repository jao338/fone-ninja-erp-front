<template>
  <CardGeneric :label="t('componente', 2)">
    <Tabs :tabItems="tabs" />
  </CardGeneric>
</template>

<script setup lang="ts">
import CardGeneric from 'components/cards/CardGeneric.vue';
import Tabs from 'components/utils/Tabs.vue';

import { useI18n } from 'vue-i18n';
import { type Tab } from 'src/util/Interface';
import { defineAsyncComponent } from 'vue';

const TabUm = defineAsyncComponent(() => import('pages/Components/Tabs/TabUm/TabUm.vue'));
const TabDois = defineAsyncComponent(() => import('pages/Components/Tabs/TabDois/TabDois.vue'));
const TabTres = defineAsyncComponent(() => import('pages/Components/Tabs/TabTres/TabTres.vue'));
const TabQuatro = defineAsyncComponent(() => import('pages/Components/Tabs/TabQuatro/TabQuatro.vue'));

const { t } = useI18n();

defineOptions({
  name: 'ComponentsPage',
});

const tabs = <Tab[]>[
  { name: 'Lottie', tab: TabUm, label: 'Lottie', disable: false },
  { name: 'Carrossel', tab: TabDois, label: t('carrossel'), disable: false },
  { name: 'GSAP', tab: TabTres, label: 'GSAP', disable: false },
  { name: 'Chat JS', tab: TabQuatro, label: 'Chart JS', disable: false }
];

</script>
