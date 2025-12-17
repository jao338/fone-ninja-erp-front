<template>
  <CardGeneric
    :label="useShoppingStore.uuid_shopping ? $t('editar') : $t('adicionar')"
    :icon="useShoppingStore.uuid_shopping ? 'edit' : 'add'"
  >
    <div v-if="loadingData" class="row q-col-gutter-md q-pa-md">
      <template v-for="(element, index) in skeleton" :key="index">
        <Skeleton v-for="n in element.qtd" :key="n" :class="element.class" />
      </template>
    </div>
    <q-form
      ref="formRef"
      class="row q-col-gutter-md q-pa-md"
      @submit.prevent="submitForm()"
      v-if="!loadingData"
    >
      <InputSelect
        v-model="form.fornecedor_uuid"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        :rules="[validateRequiredField]"
        :label="$t('fornecedor')"
        :options="optionsSuppliers"
        :loading="loadingSuppliers"
      />

      <InputAdvancedSearch
        class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9"
        v-model="produto.nome"
        :label="$t('produto')"
        :clearable="true"
        modal="Produto"
        @emitValue="setValueProduto"
        :rules="[validateRequiredField]"
      />

      <q-card-section class="col-12 justify-end q-mt-lg">
        <DefaultTable
          class="q-ma-md"
          v-model:pagination="pagination"
          :rows="form.itens"
          :columns="columns"
          :loading="loadingData"
          rowKey="produto_uuid"
        >
          <template v-slot:body-cell-actions="scope">
            <q-td :props="scope" class="q-gutter-sm">
              <ButtonGeneric
                :data-cy="`btn-edit-${scope.rowIndex}`"
                @click="console.log('Editar da tabela')"
                color="primary"
                icon="edit"
                class="button-rounded"
                flat
                dense
                no-caps
              />
              <ButtonGeneric
                :data-cy="`btn-remove-${scope.rowIndex}`"
                @click="console.log('Remover da tabela')"
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
      </q-card-section>

      <q-card-actions class="col-12 justify-end q-mt-lg">
        <ButtonGeneric
          :label="$t('voltar')"
          :aria-label="$t('voltar')"
          :to="{ name: 'shopping' }"
          class="text-capitalize"
          color="primary"
          icon="arrow_back"
          data-cy="btn-back"
        />
        <ButtonGeneric
          :loading="loadingSubmit"
          :label="$t('salvar')"
          data-cy="btn-salvar"
          type="submit"
          color="positive"
          icon="save"
          class="button-rounded"
        />
      </q-card-actions>
    </q-form>
  </CardGeneric>
</template>

<script setup lang="ts">
import CardGeneric from 'components/cards/CardGeneric.vue';
import Skeleton from 'components/skeletons/Skeleton.vue';
import ButtonGeneric from 'components/buttons/ButtonGeneric.vue';
import InputSelect from 'components/inputs/InputSelect.vue';
import DefaultTable from 'components/tables/DefaultTable.vue';
import InputAdvancedSearch from 'components/inputs/InputAdvancedSearch.vue';

import useValidations from 'src/composables/useValidations';
import useHelpers from 'src/composables/useHelpers';
import useLookups from 'src/composables/useLookups';
import useShoppingService from './Util/ShoppingService';

import { type QTableColumn, useMeta } from 'quasar';
import type { OptionsSelect, Pagination, RequestErrors, SkeletonItem } from 'src/util/Interface';
import type { Shopping } from './Util/ShoppingInterface';
import type { Product } from 'pages/Product/Util/ProductInterface';

import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';

import { shoppingStore } from 'stores/shopping';

const { validateRequiredField } = useValidations();
const { lookupSuppliers, lookupProducts } = useLookups();
const { toggleLoading, fetchOptions, getPagination } = useHelpers();
const { create, update, show } = useShoppingService('shopping');

const { t } = useI18n();

const useShoppingStore = shoppingStore();

const loadingData = ref<boolean>(false);
const loadingSubmit = ref<boolean>(false);
const loadingSuppliers = ref<boolean>(false);
const loadingProducts = ref<boolean>(false);

const optionsSuppliers = ref<OptionsSelect[]>([]);
const optionsProducts = ref<OptionsSelect[]>([]);
const pagination = ref<Pagination>(getPagination({ sortBy: 'id' }));

const errors = ref<RequestErrors>({});
const form = ref<Shopping>({
  uuid: '',
  fornecedor_uuid: '',
  itens: [],
})

const produto = ref<Product>({
  uuid: '',
  nome: '',
  custo_medio: 0,
  preco_venda: 0,
  quantidade: 0,
})

const columns: QTableColumn[] = [
  {
    name: 'nome',
    field: 'nome',
    label: t('nome'),
    sortable: true,
    align: 'left',
  },
  {
    name: 'custo_medio',
    field: 'custo_medio',
    label: t('custoMedio'),
    sortable: true,
    align: 'left',
  },
  {
    name: 'actions',
    field: 'actions',
    label: t('acoes'),
    align: 'center',
  },
];

const skeleton: SkeletonItem[] = [
  { qtd: 4, class: 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3' }
];

async function showForm(): Promise<void> {
  toggleLoading(loadingData);
  try {
    const data = await show<Shopping>(useShoppingStore.uuid_shopping);
    form.value = data.data;
  } catch {
    return;
  } finally {
    toggleLoading(loadingData);
  }
}

async function submitForm(): Promise<void> {
  toggleLoading(loadingSubmit);
  try {
    if(!useShoppingStore.uuid_shopping){
      const data = await create<Shopping>(form.value);
      useShoppingStore.setUuidShopping(data.data.uuid);
    }else{
      await update(useShoppingStore.uuid_shopping, form.value);
    }

  } catch (error: any) {
    errors.value = error.response?.data.errors ?? {};
  } finally {
    toggleLoading(loadingSubmit);
  }
}

function setValueProduto(element: any): void {
  console.log(element)
}

useMeta(() => {
  return {
    title: (t('compra') + ' - ') + (useShoppingStore.uuid_shopping ? t('editar') : t('adicionar')),
  };
});

defineOptions({
  name: 'ShoppingForm',
});

onMounted(async () => {
  if(useShoppingStore.uuid_shopping){
    await showForm();
  }
  await Promise.all([
    fetchOptions(lookupSuppliers, optionsSuppliers, loadingSuppliers),
    fetchOptions(lookupProducts, optionsProducts, loadingProducts)
  ])
})
</script>
