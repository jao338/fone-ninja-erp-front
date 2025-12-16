<template>
  <q-btn class="q-border-radius" :label="label" />
</template>

<script setup lang="ts">
import { type ButtonGeneric } from 'src/util/Interface';

withDefaults(defineProps<ButtonGeneric>(), {
  label: '',
})
</script>
