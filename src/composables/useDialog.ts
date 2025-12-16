import { type DialogChainObject, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

export default function useDialog() {
  const $q = useQuasar();
  const { t } = useI18n();

  function confirmDelete(): DialogChainObject {
    return $q.dialog({
      title: t('atencao'),
      message: t('confirmarExclusao'),
      cancel: true,
      persistent: true,
    });
  }

  return {
    confirmDelete,
  };
}
