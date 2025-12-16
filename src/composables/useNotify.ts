import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  function successMessage(message: string): void {
    $q.notify({
      type: 'positive',
      message: message,
      progress: true,
      color: 'green-7',
      classes: 'text-subtitle1',
    });
  }

  function errorMessage(message: string): void {
    $q.notify({
      type: 'negative',
      message: message,
      progress: true,
      classes: 'text-subtitle1',
    });
  }

  function warningMessage(message: string): void {
    $q.notify({
      type: 'warning',
      message: message,
      progress: true,
      textColor: 'white',
      color: 'orange',
      classes: 'text-subtitle1',
    });
  }

  return {
    successMessage,
    errorMessage,
    warningMessage,
  };
}
