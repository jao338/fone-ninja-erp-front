import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type User } from 'src/util/Interface';

export const authStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);
    const isAuthenticated = ref<boolean>(false);

    function setUserData(data: User | null = null): void {
      user.value = data;
      isAuthenticated.value = !!data;
    }

    return {
      user,
      isAuthenticated,
      setUserData,
    };
  },
  {
    persist: {
      pick: ['user'],
    },
  }
);
