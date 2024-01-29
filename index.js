function calcularResistenciaTermistor(temperatura) {
  const R0 = 10000; // Resistência em ohms a temperatura de 25°c
  const B = 3950; // Coeficiente do termistor

  const T0 = 273.15 + 25; // Referência em Kelvin

  const T = 273.15 + temperatura; // Temperatura em Kelvin

  const resistencia = R0 * Math.exp(B * (1 / T - 1 / T0));

  return resistencia;
}

function gerarBitsTemperatura(tempCelsius) {
  // Limitar a temperatura aos valores mínimo e máximo
  const temperaturaLimitada = Math.max(-40.0, Math.min(80.0, tempCelsius));

  // Normalizar a temperatura para um intervalo de 0 a 2^16 - 1 (16 bits)
  const temperaturaNormalizada = Math.round(
    ((temperaturaLimitada + 40.0) / 120.0) * (Math.pow(2, 16) - 1)
  );

  // Converter a temperatura normalizada para uma representação binária de 16 bits
  const bitsTemperatura = temperaturaNormalizada.toString(2).padStart(16, "0");

  return bitsTemperatura;
}

function decodificarBytes(bytes) {
  // Converter os bits normalizados de volta para o valor normalizado
  const temperaturaNormalizada = parseInt(bitsTemperatura, 2);

  // Desfazer a normalização para obter a temperatura real
  const temperaturaReal =
    (temperaturaNormalizada / (Math.pow(2, 16) - 1)) * 120.0 - 40.0;

  return temperaturaReal;
}

// Exemplo de uso
const temperaturaExemplo = 25.5; // Temperatura em graus Celsius
const bitsTemperatura = gerarBitsTemperatura(temperaturaExemplo);
const resultado = decodificarBytes(bitsTemperatura);

console.log(`Bits de temperatura: ${resultado}`);
