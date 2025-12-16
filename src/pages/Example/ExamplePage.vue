<template>
  <CardGeneric :label="$t('exemplo')">
      <q-form
        ref="formRef"
        @submit.prevent="searchData()"
        class="row q-pa-md q-col-gutter-md"
      >
        <q-card-section class="row col-12 justify-start">
          <InputText
            :label="t('textoExemplo')"
            class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12"
          />
        </q-card-section>
        <q-card-actions class="col-12 justify-end q-mt-lg q-pa-none">
          <ButtonGeneric
            :loading="loadingSubmit"
            data-cy="btn-filtrar"
            :label="$t('filtrar')"
            type="submit"
            color="primary"
            icon="search"
            class="button-rounded"
            :size="formatSizes('button')"
          />
        </q-card-actions>
      </q-form>
      <DefaultTable
        class="q-ma-md"
        v-model:pagination="pagination"
        :rows="rows"
        :columns="columns"
        :loading="loadingData"
        @request="searchData"
      >
        <template v-slot:body-cell-actions="scope">
          <q-td :props="scope" class="q-gutter-sm">
            <ButtonGeneric
              :data-cy="`btn-edit-${scope.rowIndex}`"
              @click="edit(scope.row.uuid)"
              color="primary"
              icon="edit"
              class="button-rounded"
              flat
              dense
              no-caps
            />
            <ButtonGeneric
              :data-cy="`btn-remove-${scope.rowIndex}`"
              @click="remove(scope.row.uuid)"
              color="negative"
              icon="delete"
              class="button-rounded"
              flat
              dense
              no-caps
            />
          </q-td>
        </template>
      </DefaultTable>
    </CardGeneric>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { exampleStore } from 'stores/example';

import CardGeneric from 'components/cards/CardGeneric.vue';
import ButtonGeneric from 'components/buttons/ButtonGeneric.vue';
import DefaultTable from 'components/tables/DefaultTable.vue';
import InputText from 'components/inputs/InputText.vue';

import useDialog from 'src/composables/useDialog';
import useHelpers from 'src/composables/useHelpers';
import useExampleService from './Util/ExampleService';
import useFormat from 'src/composables/useFormat';

import { type QTableColumn } from 'quasar';
import { type Exemplo } from './Util/ExampleInterface';
import { type Pagination, type RequestErrors } from 'src/util/Interface';

const { t } = useI18n();

const {
  toggleLoading,
  setPagination,
  getPagination,
} = useHelpers();
const { formatDate, formatSizes } = useFormat();
const { confirmDelete } = useDialog();
const { index, destroy } = useExampleService('exemplo');

const useExampleStore = exampleStore();

const loadingSubmit = ref<boolean>(false);
const loadingData = ref<boolean>(false);
const formRef = ref<HTMLFormElement | null>(null);
const errors = ref<RequestErrors>({});
const rows = ref<Exemplo[]>([]);
const pagination = ref<Pagination>(getPagination({ sortBy: 'id_example' }));
const form = ref<Exemplo>({
  uuid: '',
  uuid_input_select: '',
  dsc_input_select: '',
  input_text: '',
  input_date: '',
  input_checkbox: false,
  input_advanced_search: '',
  input_radio: '',
  input_money: 0,
  input_password: '',
  input_file: null,
});

const router = useRouter();

const columns: QTableColumn[] = [
  {
    name: 'input_text',
    field: 'input_text',
    label: t('colunaUm'),
    sortable: true,
    align: 'left',
  },
  {
    name: 'input_date',
    field: 'input_date',
    label: t('colunaDois'),
    sortable: true,
    align: 'left',
    format: val => formatDate(val)
  },
  {
    name: 'actions',
    field: 'actions',
    label: t('acoes'),
    align: 'center',
  },
];

const examples = computed<Exemplo[]>(() => [
  {
    uuid: 'A09I1091U1',
    uuid_input_select: 'IOAJAUIHA9181789262972',
    input_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquam tincidunt, nisl nisl tincidunt nisl.',
    input_date: '2001-09-11',
    input_checkbox: false,
    input_advanced_search: 'a1531',
    input_radio: '1',
    input_money: 84984,
    input_file: null,
    input_password: 'ioaaja',
    dsc_input_select: 'dsc_input_select'
  }
]);

async function searchData(props: any = {}): Promise<void> {
  setPagination(
    pagination.value,
    props.pagination?.page ?? 1,
    props.pagination?.rowsPerPage ?? 20,
    props.pagination?.rowsNumber ?? 0,
    props.pagination?.sortBy ?? 'id_exemplo',
    props.pagination?.descending ?? false,
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

    rows.value = data.data;

    setPagination(
      pagination.value,
      data.meta.current_page,
      data.meta.per_page,
      data.meta.total,
    );
  } catch (error: any) {
    errors.value = error.response?.data.errors ?? {};
  }
  finally {
    toggleLoading(loadingData);
  }
}

async function edit(uuid_example: string): Promise<void> {
  useExampleStore.setIdExample(uuid_example);
  await router.push({
    name: 'exemplo-editar',
    params: { uuid_exemplo: useExampleStore.idExample },
  });
}


function remove(uuid_exemplo: string): void {
  confirmDelete().onOk(() => {
    void (async () => {
      toggleLoading(loadingData);
      try {
        await destroy(uuid_exemplo);
      } finally {
        toggleLoading(loadingData);
      }
    })();
  });
}

defineOptions({
  name: 'Example',
});

onMounted(async () => {
  useExampleStore.resetIdExample();
  await searchData();

  // Apenas como exemplo
  rows.value = examples.value;
});

</script>
