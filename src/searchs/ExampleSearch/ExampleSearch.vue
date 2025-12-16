<template>
  <q-dialog v-model="modal" persistent full-width>
    <q-card class="advanced-modal">
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">
            {{ $t('pesquisaAvancada') }} - {{ $t('exemplo') }}
          </div>
          <ButtonGeneric icon="close" flat round dense @click="closeModal" />
        </div>
      </q-card-section>

      <q-card-section>
        <q-form
          ref="formRef"
          class="row q-col-gutter-md"
          @submit.prevent="searchData()"
          @reset="handleResetForm"
        >
          <InputText
            data-cy="text-dsc_exemplo"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            v-model="form.dsc_exemplo"
            :label="$t('exemplo')"
          />

          <q-card-actions class="col-12 justify-end">
            <ButtonGeneric
              icon="filter_alt_off"
              @click="handleResetForm"
              color="primary"
              flat
              class="button-rounded"
              :title="$t('limparFiltros')"
            />
            <ButtonGeneric
              :loading="loadingData"
              :label="$t('pesquisar')"
              color="primary"
              icon="search"
              class="button-rounded"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>

      <q-separator />

      <DefaultTable
        data-cy="table-example-search"
        class="full-width q-pa-md"
        :rows="listData"
        :rowKey="'id_exemplo'"
        :columns="columns"
        :loading="loadingData"
        v-model:pagination="pagination"
        @request="searchData"
        @row-click="emitValue"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { type Pagination } from 'src/util/Interface';
import { type Exemplo } from './Util/ExampleSearchInterface';
import { type QTableColumn } from 'quasar';

import useHelpers from 'src/composables/useHelpers';
import ClienteSearchService from './Util/ExampleSearchService';

import InputText from 'src/components/inputs/InputText.vue';
import ButtonGeneric from 'src/components/buttons/ButtonGeneric.vue';
import DefaultTable from 'src/components/tables/DefaultTable.vue';

const { t } = useI18n();

const {
  setPagination,
  resetForm,
  resetFormAdvancedSearch,
  setOriginalForm,
  toggleLoading,
  getPagination
} = useHelpers();

const { index } = ClienteSearchService('search/example');

const modal = ref<boolean>(false);
const loadingData = ref<boolean>(false);

const listData = ref<Exemplo[]>([]);

const pagination = ref<Pagination>(getPagination({ sortBy: 'coluna_um' }));
const formRef = ref<HTMLFormElement | null>(null);
const form = ref<Exemplo>({
  dsc_exemplo: '',
});

const columns: QTableColumn[] = [
  {
    name: 'colunaUm',
    field: 'coluna_um',
    label: t('colunaUm'),
    sortable: false,
    align: 'left',
  },
  {
    name: 'colunaDois',
    field: 'coluna_dois',
    label: t('colunaDois'),
    sortable: false,
    align: 'left',
  },
];
const emits = defineEmits(['emitValue']);

async function searchData(props: any = {}): Promise<void> {
  setPagination(
    pagination.value,
    props.pagination?.page ?? 1,
    props.pagination?.rowsPerPage ?? 5,
    props.pagination?.rowsNumber ?? 0,
  );
  await fetchData();
}
async function fetchData(): Promise<void> {
  try {
    toggleLoading(loadingData);

    const data = await index<Exemplo>({
      ...form.value,
      page: pagination.value.page,
      per_page: pagination.value.rowsPerPage,
      tipo_ordenacao: pagination.value.descending ? 'DESC' : 'ASC',
      campo_ordenacao: pagination.value.sortBy,
    });

    listData.value = data.data;

    setPagination(
      pagination.value,
      data.meta.current_page,
      data.meta.per_page,
      data.meta.total,
    );
  } finally {
    toggleLoading(loadingData);
  }
}
async function handleResetForm(evt?: Event): Promise<void> {
  if(evt){
    evt.preventDefault();
    await resetForm(form, searchData);
  }
}
function emitValue(evt: Event, row: object): void {
  emits('emitValue', row);
  closeModal();
}
function openModal(): void {
  modal.value = true;
}
function closeModal(): void {
  resetFormAdvancedSearch(form);
  listData.value = [];
  modal.value = false;
}

defineExpose({ openModal });

defineOptions({
  name: 'ExampleSearch',
});

onMounted(() => {
  setOriginalForm(form.value);
});
</script>
