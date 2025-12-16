<template>
  <q-separator :color="color"/>
</template>

<script setup lang="ts">
import { type Separator } from 'src/util/Interface';

withDefaults(defineProps<Separator>(), {
  color: 'info',
})
</script>
