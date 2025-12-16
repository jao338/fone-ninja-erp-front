<template>
  <div class="flex column" :class="returnGridAlign(props.align)">
    <h4
      class="text-bold no-margin"
      :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
    >{{ title }}</h4>
    <p
      class="text-subtitle1 q-my-sm"
      :class="$q.dark.isActive ? 'text-white' : 'text-grey-7'"
    >{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Title } from 'src/util/Interface';

import useHelpers from 'src/composables/useHelpers';

const { returnGridAlign } = useHelpers();

const props = withDefaults(defineProps<Title>(), {
  title: '',
  caption: '',
  align: 'left'
})

defineOptions({
  name: 'TitleH4',
})

</script>
