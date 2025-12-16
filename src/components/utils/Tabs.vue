<template>
    <q-tabs
      v-model="activeTab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab
        v-for="(tabItem, index) in tabItems"
        :data-cy="`tab-item-${index}`"
        :key="index"
        :name="tabItem.name"
        :label="tabItem.label"
        :disable="tabItem.disable"
      />
    </q-tabs>

    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel
        v-for="(tabItem, index) in tabItems"
        :key="index"
        :name="tabItem.name"
      >
        <component :is="tabItem.tab" />
      </q-tab-panel>
    </q-tab-panels>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Tab } from 'src/util/Interface';

defineOptions({
  name: 'Tabs',
});

const props = defineProps({
  tabItems: {
    type: Array as () => Tab[],
    required: true,
  },
});

const activeTab = ref<string>(
  props.tabItems.find((t) => !t.disable)?.name
  ?? props.tabItems[0]?.name
  ?? ''
);


</script>
