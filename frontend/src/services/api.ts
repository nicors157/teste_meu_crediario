import axios from "axios";

/**
 * Cria a conexão com o backend
 */
export const api = axios.create({
  baseURL: "http://localhost:3000"
});
