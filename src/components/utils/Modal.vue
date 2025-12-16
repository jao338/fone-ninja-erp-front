<template>
  <q-dialog v-model="modal" persistent full-width>
    <q-card class="advanced-modal" :class="bgColor">
      <q-card-section :class="title ? 'q-pa-md' : 'q-pa-none'">
        <div class="row justify-between items-center" v-if="title">
          <div class="text-h5 text-bold" :class="textColor">
            {{ title }}
          </div>
          <ButtonGeneric
            icon="close"
            :color="buttonColor"
            flat
            outline
            round
            dense
            @click="closeModal"
            v-if="title"
          />
        </div>
      </q-card-section>
      <div class="q-px-md q-pa-none" v-if="title">
        <hr class="no-margin">
      </div>

      <q-card-actions class="row justify-between items-center">
        <div class="row full-width" :class="textColor">
          <div :class="title ? 'col-12 q-ml-sm' : 'col-11'">
            <slot />
          </div>
          <div class="row justify-end col-1 items-start q-pa-sm" v-if="!title">
            <ButtonGeneric
              icon="close"
              :color="buttonColor"
              round
              outline
              dense
              flat
              @click="closeModal"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ButtonGeneric from '../buttons/ButtonGeneric.vue';
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  bgColor: {
    type: String,
    required: false,
  },
  textColor: {
    type: String,
    required: false,
    default: 'text-black',
  },
  buttonColor: {
    type: String,
    required: false,
    default: 'black'
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const modal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const closeModal = () => {
  modal.value = false;
};
</script>
