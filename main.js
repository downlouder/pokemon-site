const root = document.querySelector('.root');
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const arrayOfPokemon = data.results
    arrayOfPokemon.map(pokemon => {
      console.log(pokemon);
      showSpecsOfPokemon(pokemon.url)
    })
  })


function showSpecsOfPokemon(pokemonLink) {
  const pokemonStats = `${pokemonLink}`;
  fetch(pokemonStats)
    .then(response => response.json())
    .then(data => {
      if (data.id <= 10) {
        console.log(data)
        // if (data.name == 'bulbasaur') {
          root.innerHTML += `<img src=${data.sprites.other.dream_world.front_default} >`
        // }
      }
    })
    
}