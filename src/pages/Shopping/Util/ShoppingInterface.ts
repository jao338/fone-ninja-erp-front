export interface Shopping {
  uuid: string;
  fornecedor_uuid: string;
  itens: ShoppingItem[];
}

export interface ShoppingItem{
  uuid?: string,
  produto_uuid: string,
  quantidade: number,
  preco_unitario: number,
}

export interface ShoppingFilter{
  total: number,
  criado_em: string,
  atualizado_em: string,
}
