import { onNavigate } from "../../navigate.js";

export const savePokesOnSessionStorage = (randomPokeJsonString, chosenPokeJsonString) => {
  sessionStorage.setItem('random-poke', randomPokeJsonString)
  sessionStorage.setItem('chosen-poke', chosenPokeJsonString)
}

export const battle = () => {
  const savedRandomObject = sessionStorage.getItem('random-poke')
  const savedChosenObject = sessionStorage.getItem('chosen-poke')
  const randomPoke = JSON.parse(savedRandomObject);
  const chosenPoke = JSON.parse(savedChosenObject);
  const randomPokeCP = parseInt(randomPoke.stats["max-cp"])
  const chosenPokeCP = parseInt(chosenPoke.stats["max-cp"])
  const container = document.createElement('div');
  container.className = 'battle-background';
  const template = `
    <div class="battle-container">
    <img class="battle-field" src="./assets/pokefield.png">
      <div class='poke1 poke' id="chosenPoke">
        <div class='poke1Info info'>
          <p>${chosenPoke.name.toUpperCase()}</p>
        </div>
        <div>
          <img class="poke1Photo photo" src="${chosenPoke.img}"></img>
        </div>
      </div>
      <div class='poke2 poke' id="randomPoke">
        <div class='poke2Info info' >
          <p>${randomPoke.name.toUpperCase()}</p>
        </div>
        <div>
          <img class="poke2Photo photo" src="${randomPoke.img}"></img>
        </div>
      </div>
      <section id="dialogue-box" class="dialogue-box">
        <img class="box" src="./assets/dialogue-box2.png" >
        <p class='message'>Um Pokemon selvagem apareceu...</p>
      </section>
      <div id="winner-box" class="box-content" style="display: none">
      </div>
    </div>
    <div class="wrap" style="display: none">
      <div class="btn-start">POKEMONS RAROS</div>
    </div>
  `
  container.innerHTML = template;

  const dialogueBox = container.querySelector('#dialogue-box');
  const winnerBox = container.querySelector('#winner-box');
  dialogueBox.classList.add('flash-box');
  dialogueBox.addEventListener('click', battleResult);

  function battleResult() {
    if (randomPokeCP > chosenPokeCP) {
      dialogueBox.classList.remove('flash-box');
      const loserPoke = container.querySelector('#chosenPoke');
      const winnerPoke = container.querySelector('#randomPoke');
      loserPoke.style.display = 'none';
      winnerPoke.classList.add('winner-random');
      winnerBox.innerHTML += `
        <p>${randomPoke.name.toUpperCase()} VENCEU!</p> 
        <p>CP: ${randomPokeCP}</p>
      `;
      winnerBox.style.display = 'block';
    } else if (randomPokeCP < chosenPokeCP) {
      dialogueBox.classList.remove('flash-box');
      const loserPoke = container.querySelector('#randomPoke');
      const winnerPoke = container.querySelector('#chosenPoke');
      loserPoke.style.display = 'none';
      winnerPoke.classList.add('winner-chosen');
      winnerBox.style.display = 'block';
      winnerBox.innerHTML += `
        <p>${chosenPoke.name.toUpperCase()} VENCEU!</p> 
        <p>CP: ${chosenPokeCP}</p>
      `;
    } else {
    winnerBox.innerHTML += `
      <p>EMPATE!</p> 
      <p>${randomPokeCP} VS ${chosenPokeCP}</p>
    `;
    } 
    dialogueBox.removeEventListener('click', battleResult);
    const btnPageMembers = container.querySelector('.wrap');
    btnPageMembers.style.display = 'flex';
    btnPageMembers.addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate('/members');
    })
  }
  
  return container;
};

