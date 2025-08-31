import { calcularEndividamento } from "../src/services/endividamento";

/**
 * Cria os testes automáticos
 */
describe("Serviço de Endividamento", () => {
  it("deve retornar o mês e valor máximo corretamente", async () => {
    const contratos = [
      {
        contrato: "123",
        data: "2020-01-10",
        valortotal: 500,
        valorentrada: 0,
        valorfinanciado: 0,
        parcelas: [
          { valorvencimento: 100, datavencimento: "2020-02-10", totalpago: 100, capitalaberto: 400 },
          { valorvencimento: 100, datavencimento: "2020-03-10", totalpago: 100, capitalaberto: 300 },
          { valorvencimento: 100, datavencimento: "2020-04-10", totalpago: 100, capitalaberto: 200 },
          { valorvencimento: 100, datavencimento: "2020-05-10", totalpago: 100, capitalaberto: 100 },
          { valorvencimento: 100, datavencimento: "2020-06-10", totalpago: 100, capitalaberto: 0 }
        ]
      }
    ];

    const resultado = await calcularEndividamento(contratos);
    expect(resultado.mes).toBe("2020-01");
    expect(resultado.valor).toBe(500);
  });

  it("deve acumular parcelas corretamente", async () => {
    const contratos = [
      {
        contrato: "123",
        data: "2020-01-10",
        valortotal: 500,
        valorentrada: 0,
        valorfinanciado: 0,
        parcelas: [
          { valorvencimento: 500, datavencimento: "2020-02-10", totalpago: 100, capitalaberto: 400 },
          { valorvencimento: 500, datavencimento: "2020-03-10", totalpago: 100, capitalaberto: 300 },
          { valorvencimento: 500, datavencimento: "2020-04-10", totalpago: 0, capitalaberto: 300 },
          { valorvencimento: 500, datavencimento: "2020-05-10", totalpago: 100, capitalaberto: 200 },
          { valorvencimento: 500, datavencimento: "2020-06-10", totalpago: 100, capitalaberto: 100 },
          { valorvencimento: 500, datavencimento: "2020-07-10", totalpago: 100, capitalaberto: 0 },
        ]
      },
      {
        contrato: "456",
        data: "2020-04-10",
        valortotal: 600,
        valorentrada: 0,
        valorfinanciado: 600,
        parcelas: [
          { valorvencimento: 300, datavencimento: "2020-04-10", totalpago: 300, capitalaberto: 300 },
          { valorvencimento: 300, datavencimento: "2020-05-10", totalpago: 300, capitalaberto: 0 }
        ]
      }
    ];

    const resultado = await calcularEndividamento(contratos);
    expect(resultado.mes).toBe("2020-04");
    expect(resultado.valor).toBe(900);
  });
});
