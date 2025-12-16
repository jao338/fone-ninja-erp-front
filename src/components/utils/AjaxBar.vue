<template>
  <q-ajax-bar ref="bar" position="top" color="green" size="10px" skip-hijack />
</template>

<script setup lang="ts">
import { type QAjaxBar } from 'quasar';
import { ref, watch } from 'vue';

const props = defineProps({
  ajaxBar: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const bar = ref<InstanceType<typeof QAjaxBar> | null>(null)

watch(
  () => props.ajaxBar,
  (val: boolean) => {
    if(bar.value){
      if (!val) {
        return bar.value.stop()
      }

      return bar.value.start()
    }
  },
)
</script>
