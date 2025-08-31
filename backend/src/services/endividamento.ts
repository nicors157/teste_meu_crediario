/**
 * Calcula o mês de maior endividamento e o valor do mesmo
 * @param contratos
 */
export async function calcularEndividamento(contratos: any[]) {
  const meses: Record<string, number> = {};

  contratos.forEach(c => {
    let mes = c.data.substring(0,7);
    meses[mes] = c.valortotal;
    c.parcelas.forEach((p: any) => {
      let mesParcela = p.datavencimento.substring(0, 7);
      meses[mesParcela] = (meses[mesParcela] || 0) + p.capitalaberto;
    });
  });

  // encontra o mês com maior valor
  let maxMes = "";
  let maxValor = 0;

  Object.entries(meses).forEach(([mes, valor]) => {
    if (valor > maxValor) {
      maxValor = valor;
      maxMes = mes;
    }
  });

  return { mes: maxMes, valor: maxValor };
}
