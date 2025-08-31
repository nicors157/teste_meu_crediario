import { formatarData, formatarValor } from "../utils/funcoes";

type Parcela = {
  datavencimento: string;
  valorvencimento: number;
  totalpago: number;
  capitalaberto: number;
};

type Contrato = {
  _id: string;
  contrato: string;
  data: string;
  valortotal: number;
  parcelas: Parcela[];
};

interface Props {
  contrato: Contrato;
}

export default function ContratoItem({ contrato }: Props) {
  return (
    <li key={contrato._id} className="border p-3 rounded shadow">
      <p>
        <b>Contrato:</b> {contrato.contrato}
      </p>
      <p>
        <b>Data:</b> {formatarData(contrato.data)}
      </p>
      <p>
        <b>Valor total:</b>  {formatarValor(contrato.valortotal)}
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer">Parcelas</summary>
        <ul className="ml-4 mt-1">
          {contrato.parcelas.map((p, i) => (
            <li key={i}>
              {formatarData(p.datavencimento)} → {formatarValor(p.valorvencimento)} | Pago:  {formatarValor(p.totalpago)} | Aberto:  {formatarValor(p.capitalaberto)}
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
