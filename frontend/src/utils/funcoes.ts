/**
 * Função para formatar a data no formato pt-br
 * @param dataStr
 * @returns data formatada
 */
export const formatarData = (dataStr: string) => {
  var data = new Date(dataStr);
  var dia = String(data.getDate()).padStart(2, "0");
  var mes = String(data.getMonth() + 1).padStart(2, "0");
  var ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

/**
 * Função para retornar o mes por escrito
 * @param data string
 * @returns mes escrito
 */
export const retornaMes = (data: string) => {
  var [year, month] = data.split("-").map(Number);

  var months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return months[month - 1] + ` de ${year}`;
}

/**
 * Formata o valor para o formato BRL
 * @param valor 
 * @returns valor formatado R$ 0,00
 */
export const formatarValor = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};
