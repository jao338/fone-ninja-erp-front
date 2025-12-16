<template>
  <q-input
    ref="inputRef"
    v-model.lazy="formattedValue"
    class="input-rounded"
    :readonly="readonly"
    :bg-color="$q.dark.isActive ? 'grey-10' : 'grey-2'"
    outlined
    hide-bottom-space
    lazy-rules
  >
    <template v-slot:prepend>
      <div class="row items-center all-pointer-events" v-if="help">
        <q-icon class="q-mr-xs" color="grey" name="info" />

        <q-tooltip
          class="bg-grey-8"
          anchor="top left"
          self="bottom left"
          :offset="[0, 8]"
          style="font-size: 0.7rem;"
        >
          {{ props.help }}
        </q-tooltip>
      </div>
    </template>

    <template
      v-if="props.modelValue && props.clearable && !props.readonly"
      v-slot:append
    >
      <q-icon
        class="cursor-pointer"
        name="close"
        @click.stop.prevent="emits('update:modelValue', 0)"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { CurrencyDisplay, type CurrencyInputOptions, useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';

const emits = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
  modelValue: Number,
  clearable: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  precision: {
    type: Number,
    default: 2,
  },
  prefix: {
    type: String,
    default: 'symbol',
  },
  help: {
    type: String,
  },
});

const options: ExtendedCurrencyInputOptions = {
  locale: 'pt-BR',
  currency: 'BRL',
  currencyDisplay: CurrencyDisplay[props.prefix as keyof typeof CurrencyDisplay],
  precision: props.precision,
  autoDecimalDigits: true,
  useGrouping: true,
  hideCurrencySymbolOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  accountingSign: false,
  autoEmit: true,
};

interface ExtendedCurrencyInputOptions extends CurrencyInputOptions {
  autoEmit?: boolean;
}

const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput(options);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== numberValue.value) {
      setValue(newVal ?? null);
    }
  }
);

watch(numberValue, (val) => {
  emits('update:modelValue', (val != null && isNaN(val)) ? 0 : (val || 0));
});

defineOptions({
  name: 'InputMoney',
});

</script>
