<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, nextTick, onMounted, ref, watch, withDefaults } from 'vue';
import { Chart, registerables } from 'chart.js';
import { type ScatterGraphicData } from 'src/util/Interface';

Chart.register(...registerables);

const props = withDefaults(defineProps<ScatterGraphicData>(), {
  name: 'My Scatter',
  points: () => [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  showLine: false,
  borderColor: '#000',
  backgroundColor: '#ff0000',
  xMin: 0,
  xMax: 10,
  yMin: 0,
  yMax: 10,
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

function createChart() {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext('2d');
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: props.name,
          data: props.points,
          showLine: props.showLine,
          borderColor: props.borderColor,
          backgroundColor: props.backgroundColor,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: props.xMin,
          max: props.xMax,
        },
        y: {
          min: props.yMin,
          max: props.yMax,
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
  () => [props.points, props.xMin, props.xMax, props.yMin, props.yMax],
  () => {
    createChart();
  },
  { deep: true }
);

defineOptions({
  name: 'ScatterGraphic',
});
</script>
