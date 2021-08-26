export const pokeBattle = (randomPoke, chosenPoke) => {
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