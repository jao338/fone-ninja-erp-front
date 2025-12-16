import useApi from 'src/composables/useApi';

import { api } from 'boot/axios';
import { authStore } from 'stores/auth';
import { useRouter } from 'vue-router';

import { type AuthForm } from 'pages/Login/Util/LoginInterface';
import { type User } from 'src/util/Interface';

export default function LoginService(url: string) {
  const { index, create, update, destroy } = useApi(url);
  const router = useRouter();
  const auth = authStore();

  async function fetchLogin(form: AuthForm): Promise<void> {
    await csrfCookie();

    const { data } = await create<User>(form);

    auth.setUserData(data);

    await router.push({ name: 'home' });
  }

  async function fetchLogout(): Promise<void> {
    try {
      await create(url);
    } finally {
      auth.setUserData(null);
      window.location.href = '/login';
    }
  }

  async function csrfCookie(): Promise<void> {
    await api.get('sanctum/csrf-cookie');
  }

  return {
    fetchLogin,
    fetchLogout,
    create,
    index,
    update,
    destroy,
  };
}
