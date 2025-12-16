<template>
  <div :style="indentStyle">
    <q-expansion-item
      v-if="hasSubLinks"
      :default-open="item.defaultOpen ?? false"
      class="q-mb-none"
    >
      <template #header>
        <q-item-section avatar v-if="item.icon">
          <q-icon :name="item.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="item.badge" side>
          <q-badge
            :color="item.badgeColor || 'red'"
            :text-color="item.badgeTextColor || 'white'"
            rounded
          >
            {{ item.badge }}
          </q-badge>
        </q-item-section>
      </template>

      <template v-for="child in item.subLinks" :key="child.title">
        <RecursiveMenuItem :item="child" :level="level + 1" />
      </template>
    </q-expansion-item>

    <DefaultLink v-else v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import DefaultLink from 'components/utils/DefaultLink.vue';

import { computed, defineProps } from 'vue';
import { type MenuItem } from 'src/util/Interface';

const props = defineProps<{
  item: MenuItem;
  level?: number;
}>();

const hasSubLinks = computed(() => {
  return props.item.subLinks && props.item.subLinks.length > 0;
});

const level = computed(() => props.level ?? 0);

const indentStyle = computed(() => ({ paddingLeft: `${level.value * 16}px`, }));
</script>
