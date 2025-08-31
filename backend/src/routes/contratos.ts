import { Router } from "express";
import { Contrato } from "../models/contrato_schema";
import { calcularEndividamento } from "../services/endividamento";

const router = Router();

/**
 * Insere todos os contratos já com o calulo de capital aberto realizado
 */
router.post("/contratos", async (req, res) => {
  try {
    const { contratos } = req.body;

    if (!contratos || !Array.isArray(contratos)) {
      return res
        .status(400)
        .json({ error: "O body deve conter { contratos: [] }" });
    }

    await Contrato.deleteMany({});
    contratos.forEach((contrato) => {
      let valorTotal = contrato.valortotal;
      contrato.parcelas.forEach((parcela: any) => {
        parcela.capitalaberto = valorTotal - parcela.totalpago;
        valorTotal = parcela.capitalaberto;
      });
    });
    const novosContratos = await Contrato.insertMany(contratos);

    res.json({ message: "Contratos salvos com sucesso!", contratos: novosContratos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar contratos" });
  }
});

/**
 * Retorna todos os contratos
 */
router.get("/contratos", async (req, res) => {
  const contratos = await Contrato.find();
  res.json(contratos);
});

/**
 * Realiza o calculo do mes com maior endividamento
 */
router.get("/contratos/endividamento", async (req, res) => {
  const contratos = await Contrato.find();
  const resultado = await calcularEndividamento(contratos);
  res.json(resultado);
});

export default router;
