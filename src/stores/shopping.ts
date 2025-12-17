import { defineStore } from 'pinia';
import { ref } from 'vue';

export const shoppingStore = defineStore(
  'shoppings',
  () => {
    const uuid_shopping = ref<string>('');
    function setUuidShopping(element: string): void {
      uuid_shopping.value = element;
    }
    function resetUuidShopping(): void {
      uuid_shopping.value = '';
    }

    return {
      uuid_shopping,
      setUuidShopping,
      resetUuidShopping,
    };
  },
  {
    persist: true,
  },
);
