<template>
  <q-expansion-item
    :default-opened="defaultOpen"
    expand-separator
    class="no-shadow overflow-hidden expansion-item-filter "
    :header-class="$q.dark.isActive ? 'text-white' : 'text-black'"
    :expand-icon-class="$q.dark.isActive ? 'text-white' : 'text-black'"
  >
    <template v-slot:header>
      <div class="row items-center q-col-gutter-sm" >
        <q-icon :name="icon" size="sm" />
        <p class="q-ma-none q-mr-md">{{ label }}</p>
      </div>
    </template>
    <q-card :class="{ 'q-dark-2': $q.dark.isActive }">
      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ExpansionItem',
});

defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    required: false,
    default: true
  }
});
</script>
