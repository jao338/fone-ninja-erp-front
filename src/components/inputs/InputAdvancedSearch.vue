<template>
  <q-input
    :model-value="displayValue"
    @update:model-value="(val: any) => emits('update:modelValue', val)"
    class="input-rounded"
    :bg-color="$q.dark.isActive ? 'grey-10' : 'grey-2'"
    outlined
    hide-bottom-space
    lazy-rules
    readonly
  >
    <template v-slot:prepend>
      <q-icon
        name="search"
        :data-cy="`advanced-search-${modal}`"
        class="cursor-pointer"
        @click="openModal"
      />

      <component
        :is="components[modal]"
        ref="componentModal"
        @emitValue="emitValue"
        @removeValue="removeValue"
      />
    </template>
    <template v-if="modelValue && clearable" v-slot:append>
      <q-icon
        class="cursor-pointer"
        name="close"
        @click.stop.prevent="emits('clear')"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ProductSearch from 'src/searchs/ProductSearch/ProductSearch.vue';

defineOptions({
  name: 'InputAdvancedSearch',
});

const props = defineProps<{
  modelValue: string | number | (string | number)[] | undefined;
  clearable?: boolean;
  modal: string;
}>();

const displayValue = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0 ? props.modelValue.join(', ') : '';
  }
  return props.modelValue != null ? String(props.modelValue) : '';
});


const components: Record<string, any> = {
  Produto: ProductSearch,
};

const componentModal = ref<any>(null);

function openModal(): void {
  clear();
  componentModal.value.openModal();
}

function emitValue(val: object): void {
  emits('emitValue', val);
}

function removeValue(val: object): void {
  emits('removeValue', val);
}

function clear(): void {
  emits('clear');
}

const emits = defineEmits([
  'update:modelValue',
  'emitValue',
  'removeValue',
  'clear',
]);
</script>
