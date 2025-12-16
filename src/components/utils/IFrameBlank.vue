<template>
  <iframe
    :src="base64"
    class="no-margin no-padding"
    allowfullscreen
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'IframeBlank',
});

defineProps({
  base64: {
    type: String,
    required: true,
  },
});
</script>
