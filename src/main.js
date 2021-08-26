import data from './data/pokemon/pokemon.js';

import {
  filtrarPelaGeracao,
  ordenarPorNum,
  ordenarPorNome,
  filterType,
  sortCp,
  typeStats,
  filterName,
  sortFilter
} from './data.js';

const pokemonList = data.pokemon;
let pokeCard = document.getElementById("card-container");
let allPokemonCards;

const displayPokes = (pokemonData) => {


  allPokemonCards = pokemonData.map((elem) => {

    let props = elem["special-attack"]

    let attName = props.map(function (specialAttack) {
      return specialAttack["name"]

    })

    let attType = props.map(function (typeAttack) {
      return typeAttack["type"]

    })

    return allPokemonCards = `<div class="card" id="card" data-poke=${pokemonList.indexOf(elem) + 1}>
        <div class="gridContainerUp" id="gridContainerUp"> 
          <div class="mainInfo">
            <div class="title"> ${elem.name.toUpperCase()}</div>
            <div class="number">#${elem.num}</div>
          </div>
          <div class="sideInfo">
            <div class="maxHp">${elem.stats["max-hp"]}HP</div>
            <div class="maxCp">${elem.stats["max-cp"]}CP</div>
          </div>
          <hr class="upLine">
          <div class="backgroundImg" id=""backgroundImg">
            <img class="picture" src=" ${elem.img}"></img>
          </div>
          <div class="downInfo" id="downInfo">
            <div class="weight" id="weight">WEIGHT: ${elem.size.weight.toUpperCase()}</div>
            <div class="height" id="height">HEIGHT: ${elem.size.height.toUpperCase()}</div>
          </div>
        </div>
        <div class="gridContainerDown" id="gridContainerDown">
          <div class="attackList" id="attackList">SPECIAL ATTACKS
            <div class="attacks" id="attacks">${attName.join("<br>").toUpperCase()}</div>
          </div>
          <div class="typeList" id="typeList">TYPE
            <div class="type" id="type">${attType.join("<br>").toUpperCase()}</div>
          </div>  
          <hr class="downLine"> 
          <div class="weakList" id="weakList">WEAKNESSES
            <div class="weak" id="weak">${elem.weaknesses.join("<br>").toUpperCase()}</br></div>
          </div>
          <div class="resistList" id="resistList">RESISTANT
            <div class="resistant" id="resistant">${elem.resistant.join("<br>").toUpperCase()}</div>
          </div>
      </div>
    </div>
`;

  });
  pokeCard.innerHTML = allPokemonCards.join("");
};
displayPokes(pokemonList);

const getUserPoke = () => {
  const getPoke = document.querySelectorAll("[data-poke]")
  for (let poke of getPoke) {
    poke.addEventListener('click', (e) => {
      const target = e.target;
      const dataIndex = target.parentNode.parentNode.parentNode
      const pokeIndex = dataIndex.dataset.poke
      const chosenPoke = pokemonList[pokeIndex - 1]
      const randomIndex = Math.floor(Math.random() * 251)
      const randomPoke = pokemonList[randomIndex]
      console.log(randomPoke)
      console.log(chosenPoke)
      pokeBattle(randomPoke, chosenPoke)
    })
  }
}

const pokeBattle = (randomPoke, chosenPoke) => {
  const randomPokeCP = parseInt(randomPoke.stats["max-cp"])
  const chosenPokeCP = parseInt(chosenPoke.stats["max-cp"])
  if (randomPokeCP > chosenPokeCP) {
    console.log(randomPoke.name + " venceu! CP:" + randomPokeCP)
  } else if (randomPokeCP < chosenPokeCP) {
    console.log(chosenPoke.name + " venceu! CP:" + chosenPokeCP)
  } else {
    console.log('Empate!')
  }
}

getUserPoke()
const field = document.getElementById("search")
let autoCompleteValues;

field.addEventListener("input", ({ target }) => {
  const fieldContent = target.value.toLowerCase()
  let filterPokes = document.getElementById("card-container")

  if (fieldContent.length) {
    filterPokes.innerHTML = ''
    autoCompleteValues = filterName(pokemonList, fieldContent)
    sortFilter(autoCompleteValues)
    displayPokes(autoCompleteValues)

  } else {
    filterPokes.innerHTML = ''
    displayPokes(pokemonList)
  }

});


let selecionarPorTipo;
const filtrar = document.getElementById("tipoPokemon");
filtrar.addEventListener('change', () => {
  const getpokes = document.getElementById("card-container");
  getpokes.innerHTML = '';
  selecionarPorTipo = filtrar.value;

  displayPokes(filterType(pokemonList, selecionarPorTipo));

});

let ordenarMaxCp;
const ordenarPorCP = document.getElementById("maxcp");
ordenarPorCP.addEventListener('change', () => {
  const orderpokes = document.getElementById("card-container")
  orderpokes.innerHTML = '';
  ordenarMaxCp = ordenarPorCP.value;

  sortCp(pokemonList, ordenarMaxCp)
  displayPokes(pokemonList)
})

let ordernarPorNumeros;
const ordenar = document.getElementById("num");
ordenar.addEventListener('change', () => {
  const getpokes = document.getElementById("card-container");
  getpokes.innerHTML = '';
  ordernarPorNumeros = ordenar.value;

  ordenarPorNum(pokemonList, ordernarPorNumeros);
  displayPokes(pokemonList);

});


let ordenarPorNomes;
const ordenarNomes = document.getElementById("name");
ordenarNomes.addEventListener('change', () => {
  const getpokes = document.getElementById("card-container");
  getpokes.innerHTML = '';
  ordenarPorNomes = ordenarNomes.value;

  ordenarPorNome(pokemonList, ordenarPorNomes);
  displayPokes(pokemonList);

});

let allPokemonGen;
const pokemonListGeneration = data.pokemon;
const displayPokesGeneration = (pokemonData) => {


  const pokeCardGeneration = document.getElementById('slider');


  allPokemonGen = pokemonData.map((elem) => {
    return `
  
       <div>
         <img class="pictures" src=" ${elem.img}"></img>
       </div>

       <div class="name-geracao">${elem.generation.num}


       </div> 
      `;
  });

  pokeCardGeneration.innerHTML = allPokemonGen.join("")
};

displayPokesGeneration(pokemonListGeneration);


let ordernarPorGeracao;
const ordenarGeracao = document.getElementById('ordemGeracao');
ordenarGeracao.addEventListener('change', () => {
  const getpokes = document.getElementById('slider');
  getpokes.innerHTML = '';
  ordernarPorGeracao = ordenarGeracao.value;


  displayPokesGeneration(filtrarPelaGeracao(pokemonListGeneration, ordernarPorGeracao));

});


const nextEl = document.getElementById('next');
const previousEl = document.getElementById('previous');
const sliderEl = document.getElementById('slider')

function onNextClick() {

  const imgWidth = sliderEl.offsetWidth;
  sliderEl.scrollLeft += imgWidth;
}

function onPreviousClick() {
  const imgWidth = sliderEl.offsetWidth;
  sliderEl.scrollLeft -= imgWidth;
}

nextEl.addEventListener('click', onNextClick);
previousEl.addEventListener('click', onPreviousClick);

let calcType;
const typeCalc = document.getElementById("tipoPokemon")
typeCalc.addEventListener('change', () => {
  const filterpokes = document.getElementById('typeStats');
  calcType = typeCalc.value;
  filterpokes.innerHTML = `${typeStats(pokemonList, calcType)}% dos Pokemons são do tipo selecionado`;

})


/*

 const estatisticas = data.pokemon;



  let baseAttack = estatisticas.map(baseAttack => baseAttack.stats['base-attack']);
  let minAttack = baseAttack.reduce((a, b) => Math.min(a, b));
  let maxAttack = baseAttack.reduce((a, b) => Math.max(a, b));
  //let somAttack = baseAttack.reduce((a, b) => a + b);
 // let mediaAttack = parseInt(somAttack / baseAttack.length);
  const table = document.getElementById("table");







  table.innerHTML = `
  <table class=" box-alignment text-color table" >
  <tr>
    <th></th>
    <th>Attack</th>
    <th>Defense</th>

  </tr>
  <tr>
    <th>Minimo</th>
    <th class="color-table-info">${minAttack}</th>


  </tr>
  <tr>
  <th>Maximo</th>

    <th class="color-table-info">${maxAttack}</th>

  </tr>
  <tr>

</table>

  `
*/
