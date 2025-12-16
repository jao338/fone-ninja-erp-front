<template>
  <q-input
    :model-value="formattedValue"
    @update:model-value="updateModelValue"
    class="input-rounded"
    :readonly="readonly"
    outlined
    hide-bottom-space
    lazy-rules
    mask="##/##/#### ##:##"
    no-error-icon
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
            mask="DD/MM/YYYY HH:mm"
          />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
          v-model="time"
          v-if="!props.readonly"
        >
          <q-time
            :model-value="formattedValue"
            @update:model-value="updateModelValue"
            mask="DD/MM/YYYY HH:mm"
            format24h
            now-btn
          />
        </q-popup-proxy>
      </q-icon>

      <q-icon
        v-if="props.modelValue && props.clearable && !props.readonly"
        class="cursor-pointer"
        name="close"
        @click.stop.prevent="emits('update:modelValue', '')"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { type InputDateTime } from 'src/util/Interface';
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';

const props = withDefaults(defineProps<InputDateTime>(), {
  modelValue: '',
  clearable: true,
  readonly: false,
})

const mask = ref<string>('')

watch(
  () => props.modelValue,
  function (val) {
    switch (val?.length) {
      case 16:
        mask.value = 'YYYY-MM-DD HH:mm'
        break

      case 19:
        mask.value = 'YYYY-MM-DD HH:mm:ss'
        break

      case 23:
        mask.value = 'YYYY-MM-DD HH:mm:ss.SSS'
        break

      default:
        mask.value = '' // Caso não tenha um formato esperado, deixamos a máscara vazia
        break
    }
  },
  { deep: true, immediate: true },
)

const date = ref<boolean>(false)
const time = ref<boolean>(false)
const emits = defineEmits(['update:modelValue'])

const formattedValue = computed(() => {
  return formatToDisplay(props.modelValue || '')
})

function formatToDisplay(val: string): string {
  if (!val) return ''
  const date = dayjs(val, mask.value, true)
  return date.isValid() ? date.format('DD/MM/YYYY HH:mm') : val
}

function updateModelValue(val: string | number | null): void {
  const displayDate = dayjs(val, 'DD/MM/YYYY HH:mm', true)

  if (displayDate.isValid()) {
    emits('update:modelValue', displayDate.format('YYYY-MM-DD HH:mm:ss.SSS'))
    return
  }

  emits('update:modelValue', val)
}

function changeDate(val: string): void {
  updateModelValue(val)
  date.value = !!(val && date.value === false)
  time.value = !date.value
}
</script>
