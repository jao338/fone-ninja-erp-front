export interface Product {
  uuid: string | null;
  nome: string;
  custo_medio: number;
  preco_venda: number;
  quantidade: number;
}
export interface ProductSearch {
  uuid_exemplo: string;
  coluna_um: string;
  coluna_dois: string;
}
