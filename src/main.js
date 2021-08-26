import data from './data/pokemon/pokemon.js';

import {
  // filtrarPelaGeracao,
  ordenarPorNum,
  ordenarPorNome,
  filterType,
  sortCp,
  typeStats,
  filterName,
  // sortFilter
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

    pokeCard.insertAdjacentHTML("beforeend", `
      <div class='cardBtnContainer'>
      <div class="card" id="card" data-poke=${pokemonList.indexOf(elem) + 1}>
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
`);
  });
};
displayPokes(pokemonList);

const battlePage = (randomPoke, chosenPoke) => {
  const randomPokeCP = parseInt(randomPoke.stats["max-cp"])
  const chosenPokeCP = parseInt(chosenPoke.stats["max-cp"])
  const container = document.createElement('div');
  container.className = 'battleContainer';
  const template = `
    <div class='poke1 poke' id="chosenPoke">
      <div class='poke1Info info'>
        <p>${chosenPoke.name.toUpperCase()}</p>
      </div>
      <div>
        <img class="poke1Photo photo" src=" ${chosenPoke.img}"></img>
      </div>
    </div>
    <div class='poke2 poke' id="randomPoke">
      <div class='poke2Info info' >
        <p>${randomPoke.name.toUpperCase()}</p>
      </div>
      <div>
        <img class="poke2Photo photo" src=" ${randomPoke.img}"></img>
      </div>
    </div>
    <section class="dialogue-box">
      <img class="box" src="./assets/dialogue-box.png">
      <p class='message'>Um Pokemon selvagem apareceu...</p>
    </section>
    <div id="winner-box" class="box-content" style="display: none">
    </div>
    <div class="draw-box" style="display: none"></div>

`
  container.innerHTML = template

  const dialogueBox = container.querySelector('.dialogue-box')
  const winnerBox = container.querySelector('#winner-box')


  if (randomPokeCP > chosenPokeCP) {
    dialogueBox.addEventListener('click', () => {
      const loserPoke = container.querySelector('#chosenPoke')
      const winnerPoke = container.querySelector('#randomPoke')

      loserPoke.style.display = 'none';
      winnerPoke.classList.add('winner-random');
      
      winnerBox.innerHTML += `
      <p>${randomPoke.name.toUpperCase()} VENCEU!</p> 
      <p>MAX-CP: ${randomPokeCP}</p>
      `
      winnerBox.style.display = 'block'
    })

  } else if (randomPokeCP < chosenPokeCP) {
    dialogueBox.addEventListener('click', () => {
      const loserPoke = container.querySelector('#randomPoke')
      const winnerPoke = container.querySelector('#chosenPoke')
      loserPoke.style.display = 'none';
      winnerPoke.classList.add('winner-chosen')
      winnerBox.style.display = 'block'
      winnerBox.innerHTML += `
      <p>${chosenPoke.name.toUpperCase()} VENCEU!</p> 
      <p>MAX-CP: ${chosenPokeCP}</p>
      `
    })
  } else {
    const randomPoke = container.querySelector('#randomPoke')
    const chosenPoke = container.querySelector('#chosenPoke')
    winnerBox.innerHTML += `
      <p>EMPATE!</p> 
      <p>${randomPokeCP} VS ${chosenPokeCP}</p>
      `
  }


  return container
}


const renderPage = (randomPoke, chosenPoke) => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  main.appendChild(battlePage(randomPoke, chosenPoke))
}

const getUserPoke = (pokemonList) => {
  const getPoke = document.querySelectorAll("[data-poke]")
  for (let poke of getPoke) {
    poke.addEventListener('click', (e) => {
      const target = e.target;
      const dataIndex = target.parentNode.parentNode.parentNode
      const pokeIndex = dataIndex.dataset.poke
      const chosenPoke = pokemonList[pokeIndex - 1]
      const randomIndex = Math.floor(Math.random() * 251)
      const randomPoke = pokemonList[randomIndex]
      //const battleField = document.querySelector('#battle-field')
      //battleField.classList.toggle("show")
      console.log(chosenPoke)
      console.log(randomPoke)

      renderPage(randomPoke, chosenPoke)
    })
  }
}

getUserPoke(pokemonList)

const field = document.getElementById("search")
let autoCompleteValues;

field.addEventListener("input", ({ target }) => {
  const fieldContent = target.value.toLowerCase()
  let filterPokes = document.getElementById("card-container")

  if (fieldContent.length) {
    filterPokes.innerHTML = ''
    autoCompleteValues = filterName(pokemonList, fieldContent)
    displayPokes(autoCompleteValues)
    getUserPoke(pokemonList)

  } else {
    filterPokes.innerHTML = ''
    displayPokes(pokemonList)
    getUserPoke(pokemonList)
  }
});

let selecionarPorTipo;
const filtrar = document.getElementById("tipoPokemon");
filtrar.addEventListener('change', () => {
  const getpokes = document.getElementById("card-container");
  getpokes.innerHTML = '';
  selecionarPorTipo = filtrar.value;

  displayPokes(filterType(pokemonList, selecionarPorTipo));
  getUserPoke(pokemonList)
});

let ordenarMaxCp;
const ordenarPorCP = document.getElementById("maxcp");
ordenarPorCP.addEventListener('change', () => {
  const orderpokes = document.getElementById("card-container")
  orderpokes.innerHTML = '';
  ordenarMaxCp = ordenarPorCP.value;

  sortCp(pokemonList, ordenarMaxCp)
  displayPokes(pokemonList)
  getUserPoke(pokemonList)
})

let ordernarPorNumeros;
const ordenar = document.getElementById("num");
ordenar.addEventListener('change', () => {
  const getpokes = document.getElementById("card-container");
  getpokes.innerHTML = '';
  ordernarPorNumeros = ordenar.value;

  ordenarPorNum(pokemonList, ordernarPorNumeros);
  displayPokes(pokemonList);
  getUserPoke(pokemonList)
});


let ordenarPorNomes;
const ordenarNomes = document.getElementById("name");
ordenarNomes.addEventListener('change', () => {
  const getpokes = document.getElementById("card-container");
  getpokes.innerHTML = '';
  ordenarPorNomes = ordenarNomes.value;

  ordenarPorNome(pokemonList, ordenarPorNomes);
  displayPokes(pokemonList);
  getUserPoke(pokemonList)
});

/*let allPokemonGen;
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
*/
const nextEl = document.getElementById('next');
const previousEl = document.getElementById('previous');
const sliderEl = document.getElementById('card-container');
const imgWidth = sliderEl.offsetWidth;
var scrollPerClick = 0;
var scrollAmount = 0;

function onNextClick() {
  sliderEl.scrollLeft += imgWidth;
}


function onPreviousClick() {
  /*sliderEl.scrollTo({
    top:0,
    left: (scrollAmount -= imgWidth),
    behavior: 'smooth'
  });
  if(scrollAmount < 0) {
    scrollAmount = 0;
  }*/
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