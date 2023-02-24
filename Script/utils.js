// Sökfunktionen!!

	const input = document.querySelector('#pokemon-search')
	const searchButton = document.querySelector('#search-btn')
	const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20'
	const response = await fetch(url)
	const pokemonData = await response.json()



	function searchPokemon () {
		let searchInput = input.value.letter
		console.log(searchInput)
		const pokemonSearchResult = []

		let pokemonSearchList = pokemonData.results
		for (let i = 0; i < pokemonSearchList.length; i++) {
		
			if(searchInput === pokemonSearchList[i].name)
			pokemonSearchResult.push(pokemonSearchList[i])
		
		}
			console.log(pokemonData.results);
			console.log(pokemonSearchResult)
	}

input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			console.log('du söker');
			searchPokemon()
		}
	})

