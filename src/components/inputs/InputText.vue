<template>
  <q-input
    :model-value="modelValue"
    :bg-color="$q.dark.isActive ? 'grey-10' : 'grey-2'"
    :readonly="readonly"
    :error="errorState.error"
    :error-message="errorState.errorMessage"
    class="input-rounded"
    outlined
    hide-bottom-space
    lazy-rules
    @update:model-value="(val) => emits('update:modelValue', val)"
    @change="onChange"
  >
    <template v-if="modelValue && clearable && !readonly" v-slot:append>
      <q-icon
        class="cursor-pointer"
        name="close"
        @click.stop.prevent="emits('update:modelValue', null)"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import useHelpers from 'src/composables/useHelpers';
import { computed } from 'vue';

const { hasError, getError, resetValidation } = useHelpers()

const props = defineProps({
  modelValue: [String, Number],
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  hasRequestErrors: {
    type: Boolean,
    required: false,
  },
  requestErrors: {
    type: Object,
    required: false,
  },
});

const emits = defineEmits(['update:modelValue']);

const errorState = computed(() => {
  if (props.hasRequestErrors && props.requestErrors) {
    return {
      error: hasError(props.requestErrors.errors, props.requestErrors.field),
      errorMessage: getError(props.requestErrors.errors, props.requestErrors.field),
    }
  }
  return {
    error: false,
    errorMessage: ''
  }
})

function onChange() {
  if (props.hasRequestErrors && props.requestErrors) {
    resetValidation(props.requestErrors.errors, props.requestErrors.field)
  }
}

defineOptions({
  name: 'InputText',
});

</script>
