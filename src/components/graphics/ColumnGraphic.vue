<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, nextTick, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { type ColumnGraphicData } from 'src/util/Interface';

import useHelpers from 'src/composables/useHelpers';

Chart.register(...registerables);

const { getRandomColor } = useHelpers();

const props = withDefaults(defineProps<ColumnGraphicData>(), {
  name: 'My Graphic',
  fields: () => [''],
  data: () => [0],
  legendPosition: 'top',
  direction: 'x',
  stacked: false,
  beginAtZero: true,
  barThickness: 30,
});

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
    type: 'bar',
    data: {
      labels: props.fields,
      datasets: [
        {
          label: props.name,
          data: props.data,
          backgroundColor: colors,
          barThickness: props.barThickness,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: props.legendPosition,
        },
      },
      indexAxis: props.direction,
      scales: {
        x: {
          stacked: props.stacked,
          beginAtZero: props.beginAtZero,
        },
        y: {
          stacked: props.stacked,
          beginAtZero: props.beginAtZero,
        },
      },
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
  name: 'ColumnGraphic',
});
</script>
