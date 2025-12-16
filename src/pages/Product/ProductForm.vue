<template>
  <CardGeneric
    :label="useProductStore.uuidProduct ? $t('editar') : $t('adicionar')"
    :icon="useProductStore.uuidProduct ? 'edit' : 'add'"
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
      <InputText
        v-model="form.nome"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        maxLength="50"
        :rules="[validateRequiredField]"
        :label="$t('nome')"
      />

      <InputMoney
        v-model="form.custo_medio"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        :rules="[validateRequiredField]"
        :label="$t('custoMedio')"
      />

      <InputMoney
        v-model="form.preco_venda"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        :rules="[validateRequiredField]"
        :label="$t('precoVenda')"
      />

      <InputText
        v-model="form.quantidade"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        :rules="[validateRequiredField]"
        :label="$t('quantidade')"
      />

      <q-card-actions class="col-12 justify-end q-mt-lg">
        <ButtonGeneric
          :label="$t('voltar')"
          :aria-label="$t('voltar')"
          :to="{ name: 'product' }"
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
import InputText from 'components/inputs/InputText.vue';
import InputMoney from 'components/inputs/InputMoney.vue';

import useValidations from 'src/composables/useValidations';
import useHelpers from 'src/composables/useHelpers';
import useProductService from './Util/ProductService';

import { type RequestErrors, type SkeletonItem } from 'src/util/Interface';
import { type Product } from './Util/ProductInterface';

import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';

import { productStore } from 'stores/product';
import { useMeta } from 'quasar';

const { validateRequiredField } = useValidations();
const { toggleLoading } = useHelpers();
const { create, update, show } = useProductService('exemplos');
const { t } = useI18n();

const useProductStore = productStore();

const loadingData = ref<boolean>(false);
const loadingSubmit = ref<boolean>(false);

const errors = ref<RequestErrors>({});
const form = ref<Product>({
  uuid: '',
  nome: '',
  custo_medio: 0,
  preco_venda: 0,
  quantidade: 0,
})

const skeleton: SkeletonItem[] = [
  { qtd: 4, class: 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3' }
];

async function showForm(): Promise<void> {
  toggleLoading(loadingData);
  try {
    const data = await show<Product>(useProductStore.uuidProduct);
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
    if(!useProductStore.uuidProduct){
      const data = await create<Product>(form.value);
      useProductStore.setUuidProduct(data.data.uuid);
    }else{
      await update(useProductStore.uuidProduct, form.value);
    }

  } catch (error: any) {
    errors.value = error.response?.data.errors ?? {};
  } finally {
    toggleLoading(loadingSubmit);
  }
}


useMeta(() => {
  return {
    title: (t('produto') + ' - ') + (useProductStore.uuidProduct ? t('editar') : t('adicionar')),
  };
});

defineOptions({
  name: 'ProductForm',
});

onMounted(async () => {
  if(useProductStore.uuidProduct){
    await showForm();
  }
})
</script>
