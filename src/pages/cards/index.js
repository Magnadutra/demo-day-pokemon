import data from '../../data/pokemon/pokemon.js';
import { onNavigate } from "../../navigate.js";
import { savePokesOnSessionStorage } from '../battle/index.js';

import {
  ordenarPorNum,
  ordenarPorNome,
  filterType,
  sortCp,
  filterName,
} from '../../data.js';

export const cards = () => {
  const container = document.createElement('section');
  container.className = 'filter-cards'
  const template = `
    <menu class="dashboard" id="dashboard">
      <div class="dash-title">
        <img class="dash-icon" src="./assets/pokeballl.png">
          <h3>Poke Lovers</h3>
      </div>
        <nav class="buttonfunction">
          <input type="text" id="search" class="seletor" autocomplete="off" placeholder="Busque um Pokemon!">
          <select class="seletor" id="tipoPokemon" autocomplete="off">
            <option value="">Filtrar por tipo</option>
            <option value="fire">fire</option>
            <option value="water">water</option>
            <option value="normal">normal</option>
            <option value="grass">grass</option>
            <option value="ground">ground</option>
            <option value="dragon">dragon</option>
            <option value="dark">dark</option>
            <option value="steel">steel</option>
            <option value="flying">flying</option>
            <option value="electric">electric</option>
            <option value="ice">ice</option>
            <option value="rock">rock</option>
            <option value="poison">poison</option>
            <option value="bug">bug</option>
          </select>
          <select class="seletor" name="" id="name" autocomplete="off">
            <option value="all">Ordenar por Nome</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select class="seletor" name="" id="num" autocomplete="off">
            <option value="all">Ordenar por Número</option>
            <option value="crescent">Crescente</option>
            <option value="decrescent">Decrescente</option>
          </select>
          <select class="seletor" type="submit" id="maxcp" autocomplete="off">
            <option value="">Ordenar pelo CP</option>
            <option value="crescent">Crescente</option>
            <option value="decrescent">Decrescente</option>
          </select>
        </nav>
    </menu>
    <section class="carousel-container" id="carousel-container">
      <div class="carousel">
        <div id="card-container" class="card-container"></div> 
        <span id="previous" class="previous-btn"><img src="img/icon-chevron-left.png" /></span>
        <span id="next" class="next-btn"><img src="img/icon-chevron-right.png" /></i></span>
      </div>
    </section>
`;

  container.innerHTML = template;

  const field = container.querySelector("#search")
  let autoCompleteValues;
  field.addEventListener("input", ({ target }) => {
    const fieldContent = target.value.toLowerCase();
    let filterPokes = container.querySelector("#card-container");
    if (fieldContent.length) {
      filterPokes.innerHTML = '';
      autoCompleteValues = filterName(pokemonList, fieldContent);
      displayPokes(autoCompleteValues);
      initiateBattle(pokemonList);
    } else {
      filterPokes.innerHTML = '';
      displayPokes(pokemonList);
    }
  });

  let selecionarPorTipo;
  const filtrar = container.querySelector("#tipoPokemon");
  filtrar.addEventListener('change', () => {
    const getpokes = container.querySelector(".card-container");
    getpokes.innerHTML = '';
    selecionarPorTipo = filtrar.value;
    displayPokes(filterType(pokemonList, selecionarPorTipo));
    initiateBattle(pokemonList);
  });

  let ordenarMaxCp;
  const ordenarPorCP = container.querySelector("#maxcp");
  ordenarPorCP.addEventListener('change', () => {
    const orderpokes = container.querySelector(".card-container");
    orderpokes.innerHTML = '';
    ordenarMaxCp = ordenarPorCP.value;
    sortCp(pokemonList, ordenarMaxCp);
    displayPokes(pokemonList);
    initiateBattle(pokemonList);
  })

  let ordernarPorNumeros;
  const ordenar = container.querySelector("#num");
  ordenar.addEventListener('change', () => {
    const getpokes = container.querySelector("#card-container");
    getpokes.innerHTML = '';
    ordernarPorNumeros = ordenar.value;
    ordenarPorNum(pokemonList, ordernarPorNumeros);
    displayPokes(pokemonList);
    initiateBattle(pokemonList);
  });

  let ordenarPorNomes;
  const ordenarNomes = container.querySelector("#name");
  ordenarNomes.addEventListener('change', () => {
    const getpokes = container.querySelector("#card-container");
    getpokes.innerHTML = '';
    ordenarPorNomes = ordenarNomes.value;
    ordenarPorNome(pokemonList, ordenarPorNomes);
    displayPokes(pokemonList);
    initiateBattle(pokemonList);
  });

  const pokemonList = data.pokemon;
  let pokeCard = container.querySelector(".card-container");
  let allPokemonCards;
  const displayPokes = (pokemonData) => {
    allPokemonCards = pokemonData.map((elem) => {
      let props = elem["special-attack"];
      let attName = props.map(function (specialAttack) {
        return specialAttack["name"];
      })
      let attType = props.map(function (typeAttack) {
        return typeAttack["type"];
      })
      pokeCard.insertAdjacentHTML("beforeend", `
      <div class="cardBtnContainer">
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

  window.addEventListener('click', getImgWidth)
  function getImgWidth() {
    const sliderEl = container.querySelector('#card-container');
    const imgWidth = sliderEl.offsetWidth
    carouselMovement(sliderEl, imgWidth)
  }

  const carouselMovement = (sliderEl, imgWidth) => {
    window.removeEventListener('click', getImgWidth)
    const nextEl = container.querySelector('#next');
    const previousEl = container.querySelector('#previous');
    nextEl.addEventListener('click', () => {
      sliderEl.scrollLeft += imgWidth;
    });
    previousEl.addEventListener('click', () => {
      sliderEl.scrollLeft -= imgWidth;
    });
  }

  const initiateBattle = (pokemonList) => {
    const getPoke = container.querySelectorAll('[data-poke]')
    for (let poke of getPoke) {
      poke.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        const dataTarget = target.parentNode.parentNode.parentNode
        const chosenPoke = pokemonList[dataTarget.dataset.poke - 1]
        const randomPoke = pokemonList[Math.floor(Math.random() * 251)]
        const randomPokeJsonString = JSON.stringify(randomPoke);
        const chosenPokeJsonString = JSON.stringify(chosenPoke);
        savePokesOnSessionStorage(randomPokeJsonString, chosenPokeJsonString)
        onNavigate('/battle');
      });
    };
  };
  initiateBattle(pokemonList);
  return container;
}
