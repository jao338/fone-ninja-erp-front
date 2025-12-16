import { useI18n } from 'vue-i18n';
import { FieldType } from 'src/util/Enums';

import useHelpers from 'src/composables/useHelpers';
import dayjs from 'dayjs';

export default function useValidations() {
  const { calculatePasswordStrength } = useHelpers();
  const { t } = useI18n();

  function validaterequiredField(val: unknown): boolean | string {
    if (val == null) return t('campoObrigatorio');

    const { getInputType } = useHelpers();

    switch (getInputType(val)) {
      case FieldType.TextField:
        return (val as string).trim().length > 0 || t('campoObrigatorio');

      case FieldType.SelectField:
        return (val as unknown[]).length > 0 || t('campoObrigatorio');

      case FieldType.ObjectField:
        return Object.keys(val as Record<string, unknown>).length > 0 || t('campoObrigatorio');

      default:
        return true;
    }
  }

  function validateDate(val: string): boolean | string {
    if (!val) return true

    return dayjs(val, 'DD/MM/YYYY', true).isValid() || t('dataInvalida')
  }

  function validateDateTime(val: string): boolean | string {
    if (!val) return true

    return dayjs(val, 'DD/MM/YYYY HH:mm', true).isValid() || t('dataInvalida')
  }

  function validateEmail(val: string): boolean | string {
    if (!val) return true

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return pattern.test(val) || t('emailValido')
  }

  function validateCapitalLetter(val: string): boolean | string {
    const capitalLetterPattern = /[A-Z]/

    return capitalLetterPattern.test(val) || t('deveConterPeloMenosUmaLetraMaiuscula')
  }

  function validateContainsNumber(val: string): boolean | string {
    const pattern = /[0-9]/

    return pattern.test(val) || t('deveConterPeloMenosUmNumero')
  }

  function validateContainsSpecialCharacter(val: string): boolean | string {
    const pattern = /[^a-zA-Z0-9]/

    return pattern.test(val) || t('deveConterPeloMenosUmCaracterEspecial')
  }

  function validateMinLength(val: string, length: number): boolean | string {
    return val.length >= length || t('tamanhoMinimo', { length: length })
  }

  function validateRange(val: number, min: number, max: number): boolean | string {
    return (val >= min && val <= max) || t('limiteInvalido', { min, max })
  }

  function validatePassword(val: string, minLength: number): boolean | string {
    const minLengthPassword = validateMinLength(val, minLength)
    if (minLengthPassword !== true) return minLengthPassword

    const capitalLetterPassword = validateCapitalLetter(val)
    if (capitalLetterPassword !== true) return capitalLetterPassword

    const containsNumberPassword = validateContainsNumber(val)
    if (containsNumberPassword !== true) return containsNumberPassword

    const containsSpecialCharacter = validateContainsSpecialCharacter(val)
    if (containsSpecialCharacter !== true) return containsSpecialCharacter

    const strength = calculatePasswordStrength(val)
    return strength >= 50 || t('senhaDeveSerMaisForte')
  }

  function validateEqualFields(val: string, equalVal: string): boolean | string {
    return val === equalVal || t('camposNaoConferem')
  }

  return {
    validaterequiredField,
    validateDate,
    validateDateTime,
    validateEmail,
    validateCapitalLetter,
    validateContainsNumber,
    validateContainsSpecialCharacter,
    validateMinLength,
    validateRange,
    validatePassword,
    validateEqualFields
  };
}
