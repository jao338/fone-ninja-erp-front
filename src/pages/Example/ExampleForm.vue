<template>
  <CardGeneric
    :label="useExampleStore.idExample ? $t('editar') : $t('adicionar')"
    :icon="useExampleStore.idExample ? 'edit' : 'add'"
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
        v-model="form.dsc_input_select"
        data-cy="select-dsc_input_select"
        class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
        :options="optionsSelect"
        :label="$t('selectExemplo')"
        :rules="[validaterequiredField]"
        :loading="loadingSelect"
      />

      <InputAdvancedSearch
        v-model="form.input_advanced_search"
        class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
        :label="$t('advancedSearchExemplo')"
        :modal="'Exemplo'"
        :rules="[validaterequiredField]"
        @emitValue="setValueAdvancedSearch"
      />

      <InputText
        v-model="form.input_text"
        data-cy="text-text_area"
        class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        autogrow
        maxLength="255"
        :rules="[validaterequiredField]"
        :label="$t('textoExemplo')"
      />

      <InputCheckbox
        v-model="form.input_checkbox"
        :label="$t('checkboxExemplo')"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
      />

      <InputRadio
        v-model="form.input_radio"
        :options="optionsRadio"
      />

      <ExpansionItem
        class="col-12"
        icon="local_shipping"
        :label="t('extra', 2)"
        :defaultOpen="true"
      >
        <div class="row q-col-gutter-md">
          <InputDate
            :rules="[validaterequiredField]"
            v-model="form.input_date"
            data-cy="text-input_date"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            has-request-errors
            :label="$t('dataExemplo')"
            :request-errors="{ errors: errors, field: 'input_date' }"
          />
          <InputMoney
            v-model="form.input_money"
            data-cy="text-input_money"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            :label="$t('moneyExemplo')"
          />
          <InputPassword
            :rules="[validaterequiredField]"
            v-model="form.input_password"
            data-cy="text-input_password"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            has-request-errors
            :label="$t('passwordExemplo')"
            :request-errors="{ errors: errors, field: 'input_password' }"
          />
          <InputFile
            :rules="[validaterequiredField]"
            v-model="form.input_file"
            data-cy="text-input_file"
            class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"
            has-request-errors
            :label="$t('fileExemplo')"
            :request-errors="{ errors: errors, field: 'input_file' }"
          />
        </div>
      </ExpansionItem>

      <q-card-actions class="col-12 justify-end q-mt-lg">
        <ButtonGeneric
          :label="$t('voltar')"
          :aria-label="$t('voltar')"
          :to="{ name: 'exemplo' }"
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
import InputCheckbox from 'components/inputs/InputCheckbox.vue';
import InputText from 'components/inputs/InputText.vue';
import InputDate from 'components/inputs/InputDate.vue';
import InputRadio from 'components/inputs/InputRadio.vue';
import InputSelect from 'components/inputs/InputSelect.vue';
import InputMoney from 'components/inputs/InputMoney.vue';
import InputPassword from 'components/inputs/InputPassword.vue';
import InputAdvancedSearch from 'components/inputs/InputAdvancedSearch.vue';
import InputFile from 'components/inputs/InputFile.vue';
import ExpansionItem from 'components/utils/ExpansionItem.vue';

import useValidations from 'src/composables/useValidations';
import useHelpers from 'src/composables/useHelpers';
import useLookups from 'src/composables/useLookups';
import useExampleService from './Util/ExampleService';

import { type OptionsSelect, type RadioOptions, type RequestErrors, type SkeletonItem } from 'src/util/Interface';
import { type Exemplo, type ExemploSearch } from './Util/ExampleInterface';

import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';

import { exampleStore } from 'stores/example';
import { useMeta } from 'quasar';

const { validaterequiredField } = useValidations();
const { toggleLoading, fetchOptions } = useHelpers();
const { lookupPlantas } = useLookups();
const { create, update, show } = useExampleService('exemplos');
const { t } = useI18n();

const useExampleStore = exampleStore();

const loadingData = ref<boolean>(false);
const loadingSubmit = ref<boolean>(false);
const loadingSelect = ref<boolean>(false);
const optionsSelect = ref<OptionsSelect[]>([]);
const optionsRadio = ref<RadioOptions[]>([
  { label: t('ativo'), val: '1', color: 'blue' },
  { label: t('inativo'), val: '0', color: 'red' },
]);
const errors = ref<RequestErrors>({});
const form = ref<Exemplo>({
  uuid: '',
  dsc_input_select: '',
  uuid_input_select: '',
  input_text: '',
  input_date: '',
  input_checkbox: true,
  input_advanced_search: '',
  input_radio: '1',
  input_money: 123,
  input_password: '',
  input_file: null
})

const skeleton: SkeletonItem[] = [
  { qtd: 2, class: 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' },
  { qtd: 1, class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' },
  { qtd: 2, class: 'col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3' },
  { qtd: 1, class: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12' },
  { qtd: 4, class: 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6' },
];

function setValueAdvancedSearch(element: ExemploSearch): void {
  form.value.uuid_input_select = element.uuid_exemplo ?? '';
  form.value.dsc_input_select =
    (element.coluna_um ?? '') +
    '  ' +
    (element.coluna_dois ?? '')
}

async function showForm(): Promise<void> {
  toggleLoading(loadingData);
  try {
    const data = await show<Exemplo>(useExampleStore.idExample);
    form.value = data.data;
  } catch {
    // Tratar erro aqui ou apenas rediecionar
    // await router.push({ name: 'exemplo' });
  } finally {
    toggleLoading(loadingData);
  }
}

async function submitForm(): Promise<void> {
  toggleLoading(loadingSubmit);
  try {
    if(!useExampleStore.idExample){
      const data = await create<Exemplo>(form.value);
      useExampleStore.setIdExample(data.data.uuid);
    }else{
      await update(useExampleStore.idExample, form.value);
    }

  } catch (error: any) {
    errors.value = error.response?.data.errors ?? {};
  } finally {
    toggleLoading(loadingSubmit);
  }
}


useMeta(() => {
  return {
    title: (t('paginaExemplo') + ' - ') + (useExampleStore.idExample ? t('editar') : t('adicionar')),
  };
});

defineOptions({
  name: 'ExampleForm',
});

onMounted(async () => {
  if(useExampleStore.idExample){
    // Usado apenas para simular o carregamento de dados
    toggleLoading(loadingData);
    setTimeout(() => {
      toggleLoading(loadingData);
    }, 3000)

    await showForm();
  }
  await fetchOptions(lookupPlantas, optionsSelect, loadingSelect)
})
</script>
