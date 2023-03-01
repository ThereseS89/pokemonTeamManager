// Sökfunktionen!!
	const pokemonCardContainer = document.querySelector('.pokemon-card-container')	
	const input = document.querySelector('#pokemon-search')
	let pokemonSearchResult = []
	const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20'
	const response = await fetch(url)
	const pokemonData = await response.json()
	let searchValue = '';
	const pokemonImageData = {};
	let recruitedPokemon = [];

	// Detta plockar ut bilden och lägger den i ett objekt så att den inte ska hämtas varje gång appen körs
	await Promise.all(pokemonData.results.map(async (pokemon) => {
		const response = await fetch(pokemon.url)
		const data = await response.json()
		pokemonImageData[pokemon.name] = data.sprites.front_default
	}))

	input.addEventListener('keyup', event => {
			searchValue = event.target.value.toLowerCase()
			console.log(searchValue);

			pokemonSearchResult = []
		pokemonData.results.forEach((pokemon) => {
			if (pokemon.name.includes(searchValue)){
				pokemonSearchResult.push({
					name: pokemon.name,
					image: pokemonImageData[pokemon.name]})
			} 

		})
		displayPokemon()
		console.log(pokemonSearchResult);
	}) 

 export function displayPokemon () {
	pokemonCardContainer.innerHTML = ''
	pokemonSearchResult.forEach((pokemonName) => {

		// Tar fram bilden från varje pokemons enskilda data
		const pokemonImageSrc = pokemonSearchResult.find(pokemon => pokemon.name === pokemonName)?.image;

		let	pokemonCardContent = {
			pokemonCard: document.createElement('div'),
			pokemonName: document.createElement('h2'),
			pokemonImage: document.createElement('img'),
			pokemonRecruitButton: document.createElement('button')
		}  
		
		// Här behöver jag skapa en eventlyssnare på knappen "rekrytera till team", Den behöver spara pokémon-kortet i en array som jag sedan kan visa i "Team-vyn" 
		
		pokemonCardContent.pokemonRecruitButton.addEventListener('click', () => {
			console.log('Du la till en pokemon i din lista');
			
			recruitedPokemon.push ({
				name: pokemonName,
				image: pokemonName.image
			});
			console.log(recruitedPokemon);
			
		})
		
		// Skapar klassnamn för styling av pokémon-card
		
		pokemonCardContent.pokemonCard.className = 'pokemon-card'
		pokemonCardContent.pokemonName.className = 'pokemon-head'
		pokemonCardContent.pokemonRecruitButton.className = 'pokemon-recruit-btn'
		pokemonCardContent.pokemonImage.className = 'pokemon-img'
		
		pokemonCardContent.pokemonName.innerText = pokemonName.name;
		pokemonCardContent.pokemonImage.src = pokemonName.image;
		pokemonCardContent.pokemonRecruitButton.innerText = 'Rekrytera till ditt team'
		
		// Lägger till innehållet i pokemon-card
		pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonName)
		pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonImage)
		pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonRecruitButton)
		
		// Lägger till pokémon-card i en större container för att lättare positionera ut
		pokemonCardContainer.append(pokemonCardContent.pokemonCard)

	
})

}
