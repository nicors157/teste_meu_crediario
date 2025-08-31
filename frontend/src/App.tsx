import { useEffect, useState } from "react";
import { api } from "./services/api";
import ContratoItem from "./componentes/contrato_item";
import { formatarValor, retornaMes } from "./utils/funcoes";

/**
 * Tela inicial
 */
function App() {
  const [contratos, setContratos] = useState<any[]>([]);
  const [jsonInput, setJsonInput] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  /**
   * Carrega os contratos ao abrir a tela
   */
  useEffect(() => {
    fetchContratos();
  }, []);

  /**
   * Realiza o get para carregar os contratos salvos no banco de dados
   */
  const fetchContratos = async () => {
    const res = await api.get("/contratos");
    setContratos(res.data);
  };

  /**
   * Envia o JSON dos contratos para o banco de dados
   */
  const enviarJson = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      debugger;
      await api.post("/contratos", parsed);
      await fetchContratos();
      setJsonInput("");
      alert("✅ JSON salvo com sucesso!");
    } catch (err) {
      alert("⚠️ JSON inválido ou erro ao salvar.");
      console.error(err);
    }
  };

  /**
   * Calcula o endividamento
   */
  const calcular = async () => {
    const res = await api.get("/contratos/endividamento");
    setResultado(res.data);
  };

  return (
    <div className="min-h-screen relative bg-background">
      <main className="grid place-items-center pt-6 pb-20"> {/* pb-20 pra não ficar atrás do footer */}
        <section className="w-full max-w-4xl">
          <h1 className="text-center">Contratos</h1>
          <div className="space-y-3 grid place-items-center">
            <textarea
              className="w-full border rounded p-2 bg-background"
              placeholder='Cole aqui o JSON {"contratos": [...]}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <div className="flex gap-4 mt-6">
              <button
                onClick={enviarJson}
                className="text-corTexto px-4 rounded"
              >
                Salvar JSON
              </button>

              <button
                onClick={calcular}
                className="bg-primariaLight text-white px-4 py-2 rounded"
              >
                Calcular Endividamento
              </button>
            </div>

            {resultado && (
              <h2 className="mt-4">
                Mês com maior endividamento: <span className="text-red-600">{retornaMes(resultado.mes)}</span> → {formatarValor(resultado.valor)}
              </h2>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-8 mb-2">Contratos</h2>
          <ul className="space-y-3">
            {contratos.map((contratos) => (
              <ContratoItem key={contratos._id} contrato={contratos} />
            ))}
          </ul>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-4">
        © 2025 Minha Aplicação — Todos os direitos reservados
      </footer>
    </div>
  );
}

export default App;
