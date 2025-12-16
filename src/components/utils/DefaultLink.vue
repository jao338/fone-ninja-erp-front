<template>
  <q-item
    clickable
    tag="router-link"
    :to="props.link"
    :active="isActive"
    active-class="bg-primary text-white"
  >
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: "DefaultLink",
});

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    default: '/',
  },
  icon: {
    type: String,
    default: '',
  },
});

const route = useRoute();

const isActive = computed(() => {
  return route.path === props.link || route.path.startsWith(props.link + '/');
});
</script>
