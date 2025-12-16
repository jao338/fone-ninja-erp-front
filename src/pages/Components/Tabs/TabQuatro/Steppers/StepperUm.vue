<template>
  <div class="row justify-between" :class="isMobile">
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 flex flex-center">
      <DoughnutGraphic
        label="DoughnutGraphic"
        class="full-width"
        :fields="data.fields"
        :data="data.data"
        :hover-offset="data.hoverOffset"
        :legend-position="data.legendPosition"
        :cutout="data.cutout"
        :name="data.name"
      />
    </div>
    <CardGeneric class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="column q-gutter-lg">
        <div>
          <TitleH6
            align="center"
            title="DoughnutGraphic"
            :caption="t('cliqueAquiAntes')"
          />
          <div class="full-width flex-center">
            <ButtonGeneric
              :size="formatSizes('button')"
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
            <InputText
              v-model="data.cutout"
              :label="t('raioInterno')"
              class="col-12 col-md-6"
            />
            <InputMoney
              v-model="data.hoverOffset"
              label="OffSet"
              class="col-12 col-md-6"
              prefix="hidden"
              :precision="0"
            />
          </div>
        </div>

      </div>
    </CardGeneric>
  </div>
</template>

<script setup lang="ts">
import DoughnutGraphic from 'components/graphics/DoughnutGraphic.vue';
import TitleH6 from 'components/titles/TitleH6.vue';
import ButtonGeneric from 'components/buttons/ButtonGeneric.vue';
import CardGeneric from 'components/cards/CardGeneric.vue';
import InputText from 'components/inputs/InputText.vue';
import InputMoney from 'components/inputs/InputMoney.vue';
import useFormat from 'src/composables/useFormat';

import { type DoughnutGraphicData } from 'src/util/Interface';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

const { formatSizes } = useFormat();

const $q = useQuasar()

const { t } = useI18n();

const emits = defineEmits(['unlockNext']);

const data = ref<DoughnutGraphicData>({
  name: 'Gráfico de rosquinha',
  fields: ['Vendas', 'Marketing', 'Despesas', 'Lucro'] as string[],
  data: [120, 80, 50, 35],
  hoverOffset: 50,
  legendPosition: 'bottom',
  cutout: '50%',
});

const isMobile = computed<string>(() => {
  if(!$q.platform.is.mobile){
    return 'q-pa-lg q-col-gutter-md'
  }
  return ''
})

defineOptions({
  name: 'StepperUm',
});
</script>
