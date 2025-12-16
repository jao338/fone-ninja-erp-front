<template>
  <div class="row justify-center items-center q-pa-md">
    <DefaultStepper
      v-model="step"
      :steppers="steppers"
      class="col-12"
      @finish="onFinish"
      @unlock-step="unlockStep"
    />
  </div>
</template>

<script setup lang="ts">
import DefaultStepper from 'components/utils/DefaultStepper.vue';

import { type Stepper } from 'src/util/Interface';

import { defineAsyncComponent, ref } from 'vue';

const StepperUm = defineAsyncComponent(() => import('./Steppers/StepperUm.vue'));
const StepperDois = defineAsyncComponent(() => import('./Steppers/StepperDois.vue'));
const StepperTres = defineAsyncComponent(() => import('./Steppers/StepperTres.vue'));

const steppers = ref<Stepper[]>([
  { title: 'DoughnutGraphic', component: StepperUm, icon: 'home', disable: false },
  { title: 'ColumnGraphic', component: StepperDois, icon: 'home', disable: true },
  { title: 'ScatterGraphic', component: StepperTres, icon: 'home', disable: true },
])

const step = ref<number>(0);

function onFinish(): void
{
  alert('Finalizou')
}

function unlockStep(index: number): void {
  if (index >= 0 && index < steppers.value.length) {
    steppers.value[index]!.disable = false
  }
}

defineOptions({
  name: 'TabQuatro',
});

</script>
