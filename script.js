const MaxPokemon = 151;
const listWrapper = document.getElementById('list-wrapper');
const searchInput = document.getElementById('search-input');
const numberFilter = document.getElementById('number');
const nameFilter =document.getElementById('name');
const notFoundMessage = document.getElementById('not-found-message');

let allPokemons = [];

async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    allPokemons = data.results;
    renderPokemons(allPokemons);

    loadScreen();
    }

function renderPokemons(pokemons) {
    listWrapper.innerHTML = '';
    pokemons.forEach((pokemon, index) => {
        const pokemonId = pokemon.url.split('/')[6]; // Get the pokemon id from the url
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class="number-wrap">
                <p class="caption-fonts">#${pokemonId}</p>
            </div>
            <div class="img-wrap">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt="${pokemon.name}" />
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">${pokemon.name}</p>
            </div>
        `;
        listItem.addEventListener('click', () => showPokemon(pokemonId)); // Hinzugefügt, um den Dialog beim Klicken zu öffnen
        listWrapper.appendChild(listItem); // Add the Pokemon to the list   
    });
}
function filterPokemons() {   // Filter the Pokémon by the search input
    const searchValue = searchInput.value.toLowerCase();
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.startsWith(searchValue));
  
    renderPokemons(filteredPokemons);
    if (filteredPokemons.length === 0) {  // If filteredPokemons is empty, show the not found message
        notFoundMessage.style.display = 'block';   // 
    } else {
        notFoundMessage.style.display = 'none'; // If filteredPokemons is not empty, hide the not found message
    }
}

searchInput.addEventListener('input', filterPokemons); // Add the event listener to the input element


fetchPokemons();

async function showPokemon(i) {
    const dialog = document.getElementById('dialog');
    let pokemon = await fetchPokemonById(i); 
    toggleDialog(dialog);
    dialog.innerHTML = dialogContent(pokemon, dialog);
    console.log(pokemon);
}

async function fetchPokemonById(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
}

function dialogContent(pokemon, dialog) {
    return /*html*/`
        <div class="closeBtnDialog" id="closeBtnDialog" onclick="closeDialog(dialog)">X</div>
        <h1>${pokemon.name}</h1>
    `;
}

function toggleDialog(dialog) {
    dialog.classList.toggle('d-none');
}

function closeDialog(dialog) {
    toggleDialog(dialog);
}

function loadScreen(){
    const loadScreenElement = document.getElementById('loadscreen');
    loadScreenElement.style.display = 'flex'; // Zeigt den Ladebildschirm an
}