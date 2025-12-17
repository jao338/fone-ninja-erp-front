export interface Sale {
  uuid: string;
  cliente_uuid: string;
  itens: SaleItem[];
}

export interface SaleItem{
  uuid?: string,
  produto_uuid: string,
  quantidade: number,
  preco_unitario: number,
}

export interface SaleFilter{
  total: number | string,
  criado_em: string,
  atualizado_em: string,
  ativo: string | number | boolean,
  lucro: string | number,
}
