<template>
  <q-card class="q-border-radius card">
    <q-card-section class="text-white bg-primary no-padding" v-if="label">
      <div class="q-px-lg q-py-md">
        <div class="row items-center q-col-gutter-sm">
          <q-icon :name="icon" size="xs" v-if="icon" />
          <p class="no-margin text-subtitle1">
            {{ label }}
          </p>
        </div>
      </div>
    </q-card-section>

    <q-card-section :class="label || icon ? 'q-pt-none q-pb-md q-px-none' : ''" >
      <slot />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { type CardGeneric } from 'src/util/Interface';

withDefaults(defineProps<CardGeneric>(), {
  label: '',
  icon: '',
})
</script>
