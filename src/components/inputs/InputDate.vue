<template>
  <q-input
    :model-value="formattedValue"
    :bg-color="$q.dark.isActive ? 'grey-10' : 'grey-2'"
    :readonly="readonly"
    :error="errorState.error"
    :error-message="errorState.errorMessage"
    class="input-rounded"
    outlined
    hide-bottom-space
    lazy-rules
    mask="##/##/####"
    @update:model-value="updateModelValue"
    @change="onChange"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
          v-model="date"
          v-if="!props.readonly"
        >
          <q-date
            :model-value="formattedValue"
            @update:model-value="changeDate"
            today-btn
            mask="DD/MM/YYYY"
          />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon
        v-if="props.modelValue && props.clearable && !props.readonly"
        class="cursor-pointer"
        name="close"
        @click.stop.prevent="emits('update:modelValue', null)"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import useHelpers from 'src/composables/useHelpers';

import dayjs from 'dayjs';

const { hasError, getError, resetValidation } = useHelpers()

const date = ref<boolean>(false);

const props = defineProps({
  modelValue: String,
  clearable: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
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
const formattedValue = computed(() => {
  return formatToDisplay(props.modelValue || '');
});

function formatToDisplay(val: string): string {
  if (!val) return '';

  const cleanDate = val.split(' ')[0];

  const date = dayjs(cleanDate, 'YYYY-MM-DD', true);
  return date.isValid() ? date.format('DD/MM/YYYY') : val;
}

function updateModelValue(val: string | number | null): void {
  const displayDate = dayjs(val, 'DD/MM/YYYY', true);

  if (displayDate.isValid()) {
    emits('update:modelValue', displayDate.format('YYYY-MM-DD'));

    return;
  }

  emits('update:modelValue', val);
}

function onChange() {
  if (props.hasRequestErrors && props.requestErrors) {
    resetValidation(props.requestErrors.errors, props.requestErrors.field)
  }
}

function changeDate(val: string): void {
  updateModelValue(val);
  date.value = !!(val && date.value === false);
}

defineOptions({
  name: 'InputDate',
});

</script>
