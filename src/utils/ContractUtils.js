export const buildRanking = (web3, fullList, result) => {

  const allPlays = [];

  // Recorrer los resultados y pasarlos a un array
  for (let i = 0; i < result[0].length; i++) {

    //Si la jugada es válida
    if (result[6][i]) {
      const name = web3.utils.toUtf8(result[2][i]);
      const mail = web3.utils.toUtf8(result[3][i]);
      const attemps = parseInt(result[4][i]);
      const time = parseInt(result[5][i]);
      const date = result[1][i];

      allPlays.push({
        name,
        mail,
        attemps,
        time,
        date
      });
    }
  }

  // Ordenar el array
  allPlays.sort((firstValue, secondValue) => {
    // Comparar el primer término los intentos
    if (firstValue.attemps > secondValue.attemps) return 1;
    if (firstValue.attemps < secondValue.attemps) return -1;

    // Comparar segundo el tiempo
    if (firstValue.time > secondValue.time) return 1;
    if (firstValue.time < secondValue.time) return -1;

    // Último comprar quien lo hizo antes
    if (firstValue.date > secondValue.date) return 1;
    if (firstValue.date < secondValue.date) return -1;
  });

  let top10List;

  // Si se pide la lista completa
  if (!fullList) {
    top10List = allPlays;
  } else {
    top10List = allPlays.slice(0, 10);
  }

  return top10List;

}