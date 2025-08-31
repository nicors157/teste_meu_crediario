import { Schema, model } from "mongoose";

/**
 * Schema da Parcela
 */
const ParcelaSchema = new Schema({
  valorvencimento: Number,
  datavencimento: String,
  dataultimopagamento: String,
  totalpago: Number,
  capitalaberto: Number
});

/**
 * Schema da Parcela
 */
const ContratoSchema = new Schema({
  contrato: String,
  data: String,
  valortotal: Number,
  valorentrada: Number,
  valorfinanciado: Number,
  parcelas: [ParcelaSchema]
});

export const Contrato = model("Contrato", ContratoSchema);
