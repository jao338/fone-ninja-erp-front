<template>
  <q-table
    class="no-shadow"
    :class="{
      'table-index': $q.screen.gt.sm,
      'text-grey-1': $q.dark.isActive,
      'text-grey-9': !$q.dark.isActive,
    }"
    color="primary"
    :rows="flattenedRows"
    :columns="columns"
    :row-key="rowKey"
    :loading="loading"
    :hide-pagination="hidePagination"
    :rows-per-page-options="hidePagination ? [0] : [5, 10, 20, 100, 500, 1000]"
    :table-header-class="$q.dark.isActive ? 'table-dark' : 'table-light'"
  >
    <template #header="props">
      <q-tr :props="props">
        <q-th auto-width :class="$q.dark.isActive ? 'bg-dark-2' : 'bg-grey-2'" />
        <q-th v-for="col in props.cols" :key="col.name" :props="props"
              :class="$q.dark.isActive ? 'bg-dark-2' : 'bg-grey-2'">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template #body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="primary"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'expand_less' : 'expand_more'"
          />
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>

      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <q-table
            flat
            dense
            bordered
            :rows="props.row[subTableKey]"
            :columns="subTableColumns"
            :row-key="subTableRowKey"
            hide-pagination
            v-if="Array.isArray(props.row[subTableKey])"
            class="q-my-md"
          >
            <template #header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props"
                      :class="$q.dark.isActive ? 'bg-dark-2' : 'bg-grey-2'">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
          </q-table>
        </q-td>
      </q-tr>
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

    <template
      v-for="(_, slot) in ($slots as Readonly<QTableSlots>)"
      v-slot:[slot]="scope: any"
    >
      <slot :name="slot" v-bind="scope || {}" />
    </template>

  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QTableSlots } from 'quasar';

defineOptions({
  name: 'ExpandTable'
});

const props = withDefaults(defineProps<{
  rows: any[];
  columns: any[];
  rowKey: string;
  loading?: boolean;
  subTableColumns: any[];
  subTableKey: string;
  hidePagination: boolean;
  subTableRowKey?: string;
}>(), {
  loading: false,
  hidePagination: false,
  subTableRowKey: 'uuid'
});

const flattenedRows = computed(() => props.rows.flat());

</script>
