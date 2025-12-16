<template>
  <q-breadcrumbs class="q-pa-md">
    <q-breadcrumbs-el v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link
        v-if="crumb.isLink"
        :to="crumb.path || ''"
        class="breadcrumb-link"
      >
        <q-icon :name="crumb.icon" size="16px" class="q-mr-sm" />
        {{ crumb.label }}
      </router-link>
      <span v-else class="breadcrumb-label">
        <q-icon :name="crumb.icon" size="16px" class="q-mr-sm" />
        {{ crumb.label }}
      </span>
    </q-breadcrumbs-el>
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { type Crumb } from 'src/util/Interface';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();

const breadcrumbs = computed<Crumb[]>(() =>
  route.matched.map((r) => {
    const meta = r.meta as {
      breadCrumbLabel?: string;
      breadCrumbIcon?: string;
      breadCrumbLink?: boolean;
    };

    return {
      label: t(meta.breadCrumbLabel || ''),
      icon: meta.breadCrumbIcon || 'home',
      isLink: meta.breadCrumbLink ?? false,
      path: r.path,
    };
  })
);
</script>
