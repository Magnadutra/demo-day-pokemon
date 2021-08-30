import { onNavigate } from "../../navigate.js";

export const initial = () => {
  const container = document.createElement('div')
  container.className = 'initial-container'
  const template = `
    <header>
      <h1 class="texto">
        Olá! Seja bem-vinde ao melhor site de batalhas de Pokémon!
      </h1>
      <h2 class="texto">
        Além de procurar e filtrar informações sobre o seu Pokémon favorito,
        você poderá batalhar com ele!
      </h2>
    </header>
    <main>
      <figure>
        <img class="gif" src="img/gifpikaball.gif" alt="gif do pikachu com a pokebola"/>
      </figure>
      <div class="wrap">
        <div class="btn-start">DESCUBRA MAIS</div>
      </div>
    </main>
`;

  container.innerHTML = template;

  container.querySelector('.btn-start')
  .addEventListener('click', (event) => {
    event.preventDefault();
    onNavigate('/cards');
  });

  return container;
}