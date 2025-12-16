<template>
  <q-input
    :type="currentType"
    :model-value="props.modelValue"
    :bg-color="$q.dark.isActive ? 'grey-10' : 'grey-2'"
    :readonly="props.readonly"
    :error="errorState.error"
    :error-message="errorState.errorMessage"
    outlined
    hide-bottom-space
    class="input-rounded"
    lazy-rules
    @update:model-value="(val) => emits('update:modelValue', val)"
    @change="onChange"
  >
    <template v-slot:append>
      <q-icon
        class="cursor-pointer"
        :name="currentType === 'password' ? 'visibility_off' : 'visibility'"
        @click="toggleType"
      />

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

const { hasError, getError, resetValidation } = useHelpers()

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String as () =>
      | 'number'
      | 'textarea'
      | 'time'
      | 'text'
      | 'password'
      | 'email'
      | 'search'
      | 'tel'
      | 'file'
      | 'url'
      | 'date'
      | 'datetime-local',
    required: false,
    default: 'password'
  },
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

const showPassword = ref<boolean>(false);

const currentType = computed(() => {
  if (props.type !== 'password') return props.type;
  return showPassword.value ? 'text' : 'password';
});

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

function toggleType() {
  showPassword.value = !showPassword.value;
}

const emits = defineEmits(['update:modelValue', 'toggleIsPwd']);

defineOptions({
  name: 'InputPassword',
});
</script>
