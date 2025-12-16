<template>
  <div class="row justify-between" :class="isMobile">
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 flex flex-center">
      <ScatterGraphic
        class="full-width"
        :name="data.name"
        :points="data.points"
        :show-line="data.showLine"
        :border-color="data.borderColor"
        :background-color="data.backgroundColor"
        :x-min="data.xMin"
        :x-max="data.xMax"
        :y-min="data.yMin"
        :y-max="data.yMax"
      />
    </div>
    <CardGeneric class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <div class="column q-gutter-lg">
        <div>
          <TitleH6
            align="center"
            title="ScatterGraphic"
          />
        </div>

        <div>
          <div class="text-subtitle1 text-bold q-mb-sm">Pontos</div>
          <div class="row q-col-gutter-md">
            <div
              v-for="(point, index) in data.points"
              :key="`point-${index}`"
              class="col-12 col-md-6"
            >
              <InputMoney
                v-model="data.points[index]!.x"
                label="X"
                prefix="hidden"
                :precision="2"
                class="q-mb-md"
              />
              <InputMoney
                v-model="data.points[index]!.y"
                label="Y"
                prefix="hidden"
                :precision="2"
              />
            </div>
          </div>
        </div>

        <div>
          <div class="text-subtitle1 text-bold q-mb-sm">{{ t('configuracao', 2) }}</div>
          <div class="row q-col-gutter-md">
            <InputColor
              v-model="data.borderColor"
              :label="t('corDaBorda')"
              class="col-12 col-md-6"
            />
            <InputColor
              v-model="data.backgroundColor"
              :label="t('corDeFundo')"
              class="col-12 col-md-6"
            />
            <InputMoney
              v-model="data.xMin"
              :label="t('xMinimo')"
              class="col-12 col-md-6"
              prefix="hidden"
              :precision="2"
            />
            <InputMoney
              v-model="data.xMax"
              :label="t('xMaximo')"
              class="col-12 col-md-6"
              prefix="hidden"
              :precision="2"
            />
            <InputMoney
              v-model="data.yMin"
              :label="t('yMinimo')"
              class="col-12 col-md-6"
              prefix="hidden"
              :precision="2"
            />
            <InputMoney
              v-model="data.yMax"
              :label="t('yMaximo')"
              class="col-12 col-md-6"
              prefix="hidden"
              :precision="2"
            />
          </div>
        </div>

      </div>
    </CardGeneric>
  </div>
</template>

<script setup lang="ts">
import ScatterGraphic from 'components/graphics/ScatterGraphic.vue';
import TitleH6 from 'components/titles/TitleH6.vue';
import CardGeneric from 'components/cards/CardGeneric.vue';
import InputMoney from 'components/inputs/InputMoney.vue';
import InputColor from 'components/inputs/InputColor.vue';

import { type ScatterGraphicData } from 'src/util/Interface';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const { t } = useI18n();

const data = ref<ScatterGraphicData>({
  name: t('graficoPontos'),
  points: [
    { x: -7, y: 0 },
    { x: 0, y: 7 },
    { x: 7, y: 5 },
    { x: 0.5, y: 5.5 },
  ],
  showLine: false,
  borderColor: '#000000',
  backgroundColor: '#ff0000',
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
});

const isMobile = computed<string>(() => {
  if (!$q.platform.is.mobile) {
    return 'q-pa-lg q-col-gutter-md';
  }
  return '';
});

defineOptions({
  name: 'StepperTres',
});
</script>
