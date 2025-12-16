<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, nextTick, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { type DoughnutGraphicData } from 'src/util/Interface';

import useHelpers from 'src/composables/useHelpers';

Chart.register(...registerables);

const { getRandomColor } = useHelpers();

const props = withDefaults(defineProps<DoughnutGraphicData>(), {
  name: 'My Graphic',
  fields: () => [''],
  data: () => [0],
  hoverOffset: 0,
  cutout: '50%',
  legendPosition: 'bottom',
})

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
let colors: string[] = [];

function createChart() {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext('2d');

  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  if (colors.length !== props.data.length) {
    colors = props.data.map(() => getRandomColor());
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: props.fields,
      datasets: [
        {
          label: props.name,
          data: props.data,
          backgroundColor: colors,
          hoverOffset: props.hoverOffset ?? 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: props.legendPosition ?? 'top',
        },
      },
      cutout: props.cutout ?? '70%',
    },
  });
}

onMounted(async () => {
  await nextTick();
  createChart();
});

watch(
  () => [props.fields, props.data],
  () => {
    createChart();
  },
  { deep: true }
);

defineOptions({
  name: 'DoughnutGraphic',
});
</script>
