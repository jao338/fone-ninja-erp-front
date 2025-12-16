<template>
  <q-select
    :model-value="props.modelValue"
    @update:model-value="(val) => emits('update:modelValue', val)"
    @filter="onFilter"
    class="input-rounded"
    outlined
    hide-bottom-space
    lazy-rules
    options-cover
    input-debounce="300"
    map-options
    emit-value
    :readonly="readonly"
    :use-input="useInput"
    :hide-selected="useInput != true"
    :fill-input="false"
    :multiple="props.multiple"
    :use-chips="props.multiple && !props.withoutLabel"
    :virtual-scroll="true"
    :options="filteredOptions"
    :option-label="optionLabel"
    :option-value="optionValue"
    :error="errorState.error"
    :error-message="errorState.errorMessage"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { computed, type PropType, ref, watch } from 'vue';
import { type OptionsSelect, type RequestErrors } from 'src/util/Interface';

import useHelpers from 'src/composables/useHelpers';

const { hasError, getError, resetValidation } = useHelpers();

const props = defineProps({
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
    default: '',
  },
  options: {
    type: Array<OptionsSelect>,
    required: true
  },
  optionLabel: {
    type: String,
    required: false,
    default: 'label'
  },
  optionValue: {
    type: String,
    required: false,
    default: 'value'
  },
  multiple: {
    type: Boolean,
    required: false
  },
  withoutLabel: {
    type: Boolean,
    required: false
  },
  hasRequestErrors: {
    type: Boolean,
    required: false
  },
  requestErrors: {
    type: Object as PropType<{ field: string; errors: RequestErrors }>,
    required: false,
  }
});

const useInput = ref<boolean>(true)
const readonly = ref<boolean>(false)
const search = ref<string>('')
const filteredOptions = ref<OptionsSelect[]>([...props.options])

const emits = defineEmits<{
  (e: 'update:modelValue', val: (string | number | number[] | string[])): void
  (e: 'search', val: string): void
}>()

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

function onFilter(val: string, update: (cb: () => void) => void): void {
  emits('search', String(val))

  update(() => {
    search.value = String(val)
    if (!val) {
      filteredOptions.value = [...props.options]
    } else {
      filteredOptions.value = props.options.filter((opt) => {
        return opt.label.toLowerCase().includes(String(val).toLowerCase())
      })
    }
  })
}

watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = [...newOptions]
  }
)
</script>
