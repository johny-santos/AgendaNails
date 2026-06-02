import Decimal from 'decimal.js';

export interface Service {
  id_servico: number;
  nome_servico: string;
  valor_base: Decimal;
}
