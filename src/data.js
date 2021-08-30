const filtrarPelaGeracao = (data, valor) => {
  const filtrarPokemonPelaGeracao = data.filter(
    pokemon => pokemon.generation.name === valor,
  );

  return filtrarPokemonPelaGeracao;
};

const ordenarPorNum = (data, valor) => {
  if (valor === 'crescent') {
    return data.sort((a, b) => {
      return a.num - b.num
    })

  } else {
      return data.sort((a, b) => {
        return b.num - a.num
      })
  }
};

const ordenarPorNome = (data, valor) => {
  if (valor === 'A-Z') {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return data.sort((a, b) => b.name.localeCompare(a.name));
  }

};

const sortCp = (data, order) => {
  if (order === "decrescent") {
    return data.sort((a, b) => {
      return b["stats"]["max-cp"] - a["stats"]["max-cp"];
    })

  } else {
      return data.sort((a, b) => {
        return a["stats"]["max-cp"] - b["stats"]["max-cp"];
      })
    }
    
}

const filterType = (data, valor) => {
  const arrayType = data.filter(pokemon => pokemon.type.indexOf(valor)> -1)
    return arrayType 
  
};

function filterName(data, valor){
  const arrayName = data.filter(pokemon => pokemon.name.indexOf(valor)> -1)
  return arrayName
}

function sortFilter(data){
  return data.sort((a, b) => a.name.localeCompare(b.name));
}

export {
  filtrarPelaGeracao,
  ordenarPorNum,
  sortCp, 
  filterType,
  ordenarPorNome,
  filterName,
  sortFilter
};