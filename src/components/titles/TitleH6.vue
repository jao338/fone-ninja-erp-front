<template>
  <div class="flex column" :class="returnGridAlign(props.align)">
    <h6
      class="text-bold no-margin"
      :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
    >{{ props.title }}</h6>
    <p
      class="text-subtitle2 q-my-sm"
      :class="$q.dark.isActive ? 'text-white' : 'text-grey-7'"
    >{{ props.caption }}</p>
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
  name: 'TitleH6',
})

</script>
