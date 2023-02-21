	
	
	// plocka ut söksträngen från DOM -> lägga i en variabel
	// konstruera URL
	// ta reda på hur API:et svarar
	// skicka request - vänta på svar - gör om till JS-objekt
	// kom ihåg: felhantering
	// presentera datan för användaren

	const input = document.querySelector('#pokemon-search')

	let searchInput = input.value
	const url = 'https://pokeapi.co/api/v2/pokemon/ditto'


	const response = fetch(url)
	const pokemonData = response.json()
	console.log(pokemonData)
