<template>
  <q-table
    class="no-shadow"
    :class="{
      'table-index': $q.screen.gt.sm,
      'text-grey-1': $q.dark.isActive,
      'text-grey-9': !$q.dark.isActive,
    }"
    color="primary"
    :rows="props.rows"
    :columns="props.columns"
    :loading="props.loading"
    :row-key="props.rowKey"
    :hide-pagination="hidePagination"
    :rows-per-page-options="hidePagination ? [0] : [5, 10, 20, 100, 500, 1000]"
    :table-header-class="$q.dark.isActive ? 'table-dark' : 'table-light'"
    binary-state-sort
  >
    <template v-slot:no-data="{ icon, message }">
      <div
        class="full-width row flex-center q-gutter-sm"
        :class="{
          'text-grey-1': $q.dark.isActive,
          'text-grey-9': !$q.dark.isActive,
        }"
      >
        <q-icon size="2em" :name="icon" />
        <span>
          {{ message }}
        </span>
      </div>
    </template>

    <template v-slot:pagination="scope">
      <q-btn
        data-cy="btn-prev-page"
        icon="chevron_left"
        :color="$q.dark.isActive ? 'grey-1' : 'grey-8'"
        round
        dense
        flat
        :disable="scope.isFirstPage"
        @click="scope.prevPage"
      />

      <q-btn
        data-cy="btn-next-page"
        icon="chevron_right"
        :color="$q.dark.isActive ? 'grey-1' : 'grey-8'"
        round
        dense
        flat
        :disable="scope.isLastPage"
        @click="scope.nextPage"
      />
    </template>

    <template
      v-for="(_, slot) in ($slots as Readonly<QTableSlots>)"
      v-slot:[slot]="scope: any"
    >
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { QTableSlots } from 'quasar';

const props = defineProps({
  rows: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Array as () => any[],
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  rowKey: {
    type: String,
    default: 'uuid'
  },
  hidePagination: {
    type: Boolean,
    default: false
  }
});

defineOptions({
  name: 'DefaultTable'
});
</script>
