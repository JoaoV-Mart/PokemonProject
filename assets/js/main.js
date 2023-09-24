const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>                    
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>`
}

function loadPokemonitens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
})
}

loadPokemonitens(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset += limit
    const qtdRecordsNextPage = offset + limit

    if(qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonitens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
       loadPokemonitens(offset, limit) 
    }
})