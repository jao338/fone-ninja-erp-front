<template>
  <div class="row justify-between q-col-gutter-lg q-pa-lg">
    <CardGeneric class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="column q-gutter-lg">
        <div>
          <TitleH6
            align="center"
            title="ColumnGraphic"
            :caption="t('cliqueAquiAntes')"
          />
          <div class="full-width flex-center">
            <ButtonGeneric
              @click="emits('unlockNext')"
              :label="t('liberar')"
              color="primary"
              class="q-px-lg"
            />
          </div>
        </div>

        <div>
          <div class="text-subtitle1 text-bold q-mb-sm">Labels</div>
          <div class="row q-col-gutter-md">
            <InputText
              v-for="(field, index) in data.fields"
              :key="`label-${index}`"
              v-model="data.fields[index]!"
              label="Label"
              class="col-12 col-md-6"
            />
          </div>
        </div>

        <div>
          <div class="text-subtitle1 text-bold q-mb-sm">{{ t('dado', 2) }}</div>
          <div class="row q-col-gutter-md">
            <InputMoney
              v-for="(field, index) in data.data"
              :key="`data-${index}`"
              v-model="data.data[index]!"
              :label="data.fields[index]"
              class="col-12 col-md-6"
              prefix="hidden"
              :precision="2"
            />
          </div>
        </div>

        <div>
          <div class="text-subtitle1 text-bold q-mb-sm">{{ t('configuracao', 2) }}</div>
          <div class="row q-col-gutter-md">
            <InputSelect
              v-model="data.legendPosition"
              :label="t('posicaoDoTituloDoGrafico')"
              class="col-12 col-md-6"
              :options="optionsLegendPosition"
            />
            <InputSelect
              v-model="data.direction"
              :label="t('orientacaoGrafico')"
              class="col-12 col-md-6"
              :options="optionsOrientation"
            />
            <InputText
              v-model="data.barThickness"
              :label="t('espessuraBarras')"
              class="col-12 col-md-6"
              mask="###"
            />
            <InputCheckbox
              v-model="data.stacked"
              :label="t('barrasEmpilhadas')"
              class="col-6 col-md-3"
            />
            <InputCheckbox
              v-model="data.beginAtZero"
              :label="t('comecaComZero')"
              class="col-6 col-md-3"
            />
          </div>
        </div>

      </div>
    </CardGeneric>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 flex flex-center">
      <ColumnGraphic
        label="DoughnutGraphic"
        class="full-width"
        :fields="data.fields"
        :data="data.data"
        :name="data.name"
        :legendPosition="data.legendPosition"
        :stacked="data.stacked"
        :direction="data.direction"
        :beginAtZero="data.beginAtZero"
        :barThickness="data.barThickness"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ColumnGraphicData, type OptionsSelect } from 'src/util/Interface';
import { ref } from 'vue';

import ColumnGraphic from 'components/graphics/ColumnGraphic.vue';
import TitleH6 from 'components/titles/TitleH6.vue';
import InputMoney from 'components/inputs/InputMoney.vue';
import InputText from 'components/inputs/InputText.vue';
import InputSelect from 'components/inputs/InputSelect.vue';
import InputCheckbox from 'components/inputs/InputCheckbox.vue';
import ButtonGeneric from 'components/buttons/ButtonGeneric.vue';
import CardGeneric from 'components/cards/CardGeneric.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const data = ref<ColumnGraphicData>({
  name: 'Gráfico de coluna',
  fields: ['Vendas', 'Marketing', 'Despesas', 'Lucro'] as string[],
  data: [120, 80, 50, 35],
  legendPosition: 'bottom',
  stacked: false,
  direction: 'y',
  beginAtZero: true,
  barThickness: 50,
});

const optionsLegendPosition = ref<OptionsSelect[]>([
  { label: t('topo'), value: 'top' },
  { label: t('esquerda'), value: 'left' },
  { label: t('direita'), value: 'right' },
  { label: t('embaixo'), value: 'bottom' },
])

const optionsOrientation = ref<OptionsSelect[]>([
  { label: t('eixoX'), value: 'x' },
  { label: t('eixoY'), value: 'y' },
])

const emits = defineEmits(['unlockNext']);

defineOptions({
  name: 'StepperDois',
});
</script>
