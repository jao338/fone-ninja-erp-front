import { defineStore } from 'pinia';
import { ref } from 'vue';

export const productStore = defineStore(
  'products',
  () => {
    const uuid_product = ref<string>('');
    function setUuidProduct(element: string): void {
      uuid_product.value = element;
    }
    function resetUuidProduct(): void {
      uuid_product.value = '';
    }

    return {
      uuid_product,
      setUuidProduct,
      resetUuidProduct,
    };
  },
  {
    persist: true,
  },
);
