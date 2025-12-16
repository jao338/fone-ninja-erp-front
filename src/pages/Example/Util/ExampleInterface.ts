export interface Exemplo {
  uuid: string;
  input_text: string;
  input_date: string;
  uuid_input_select: string | number;
  dsc_input_select: string;
  input_checkbox: boolean;
  input_advanced_search: string;
  input_radio: string;
  input_money: number;
  input_password: string;
  input_file: File | File[] | FileList | null
}
export interface ExemploSearch {
  uuid_exemplo: string;
  coluna_um: string;
  coluna_dois: string;
}
