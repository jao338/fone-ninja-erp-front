import { defineStore } from 'pinia';
import { ref } from 'vue';

export const saleStore = defineStore(
  'sales',
  () => {
    const uuid_sale = ref<string>('');
    function setUuidSale(element: string): void {
      uuid_sale.value = element;
    }
    function resetUuidSale(): void {
      uuid_sale.value = '';
    }

    return {
      uuid_sale,
      setUuidSale,
      resetUuidSale,
    };
  },
  {
    persist: true,
  },
);
