const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

const app = document.querySelector('.app');
const randomBtn = document.querySelector('.random');
const cardBlock = document.querySelector('.card-block');

const typeColor = {
  Normal: '#CA98A6',
  Fire: '#FD4B5A',
  Water: '#85A8FB',
  Grass: '#27CB50',
  Electric: '#F2EE29',
  Ice: '#86D2F5',
  Fighting: '#EF6239',
  Poison: '#9B69DA',
  Ground: '#A8702D',
  Flying: '#94B2C7',
  Psychic: '#F71D92',
  Bug: '#3C9950',
  Rock: '#8B3E22',
  Ghost: '#906791',
  Dark: '#585978',
  Dragon: '#56AFBD',
  Steel: '#47B691',
  Fairy: '#E91368',
};

function generateCart() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const arrayOfPokemon = data.results
      pickRandomPokemon(arrayOfPokemon);
    })
}

function pickRandomPokemon(array) {
  const randomCartID = Math.floor(Math.random() * array.length) // 1010
  const randomPokemonURL = array[randomCartID].url;
  showSpecsOfPokemon(randomPokemonURL)
}

function showSpecsOfPokemon(pokemonLink) {
  fetch(pokemonLink)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const image = data.sprites.other.dream_world.front_default || data.sprites.front_default;
      const name = data.name[0].toUpperCase() + data.name.slice(1);
      const hp = data.stats[0].base_stat;
      const attack = data.stats[1].base_stat;
      const defense = data.stats[2].base_stat;
      const spAtk = data.stats[3].base_stat;
      const spDef = data.stats[4].base_stat; 
      const speed = data.stats[5].base_stat;
      
      if (!image) return;
      cardBlock.innerHTML = `
        <div class="img-block">
          <img class="pokemon-img" src=${image} />
        </div>
        <p class="types"></p>
        <p class="name">Name: ${name}</p>
        <p class="total">Total: ${getTotalValue(data.stats)}</p>
        <p class="hp">HP: ${hp}</p>
        <p class="attack">Attack: ${attack}</p>
        <p class="defense">Defense: ${defense}</p>
        <p class="sp-atk">Sp. Atk: ${spAtk}</p>
        <p class="sp-def">Sp. Def: ${spDef}</p>
        <p class="speed">Speed: ${speed}</p>
        <p class="index">#${setIndex(data.id)}</p>
      `;
      addTypes(data.types)
    })  
}

function getTotalValue(stats) {
  return stats.reduce((acc, val) => acc + val.base_stat,0);
}

function addTypes(types) {
  const typesP = document.querySelector('.types');
  types.forEach(item => {
    const type = item.type.name[0].toUpperCase() + item.type.name.slice(1); 
    const span = document.createElement('span');
    span.textContent = type;
    span.style.backgroundColor = setTypeColor(type);
    typesP.appendChild(span);
  })
}

function setTypeColor(pokemonType) {
  return typeColor[pokemonType];
}

function setIndex(id) {
  if (id < 10) return `000${id}`
  else if (id < 100) return `00${id}`
  else if (id < 1000) return `0${id}`
  return id;
}
  
randomBtn.addEventListener('click', generateCart);