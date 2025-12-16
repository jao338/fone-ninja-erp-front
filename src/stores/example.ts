import { defineStore } from 'pinia';
import { ref } from 'vue';

export const exampleStore = defineStore(
  'examples',
  () => {
    const idExample = ref<string>('');
    function setIdExample(element: string): void {
      idExample.value = element;
    }
    function resetIdExample(): void {
      idExample.value = '';
    }

    return {
      idExample,
      setIdExample,
      resetIdExample,
    };
  },
  {
    persist: true,
  },
);
