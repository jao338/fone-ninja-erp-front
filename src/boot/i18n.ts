import messages from 'src/i18n';
import { boot } from 'quasar/wrappers';
import { systemStore } from 'stores/system';
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'pt-BR',
  legacy: false,
  messages
});

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['pt-BR'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export default boot(({ app }) => {
  const system = systemStore();

  i18n.global.locale.value = system.language;

  app.use(i18n);
});
