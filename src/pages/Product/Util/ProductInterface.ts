export interface Product {
  uuid: string;
  nome: string;
  custo_medio: number;
  preco_venda: number;
  quantidade: number;
}
export interface ProductFilter {
  uuid: string | null;
  nome: string;
  quantidade: number | string;
  criado_em: string;
  atualizado_em: string;
}
