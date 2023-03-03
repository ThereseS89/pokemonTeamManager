
const pokemonDisplayData = [];
const pokemonCardContainer = document.querySelector('.pokemon-card-container')
const yourTeamContainer = document.querySelector('.your-team-container')
const yourReservesContainer = document.querySelector('.your-reserves-container')
let recruitedPokemon = [];

export async function getPokemonData() {
	const urlpokemon = 'https://pokeapi.co/api/v2/pokemon/';
	const response = await fetch(urlpokemon);
	const pokemonData = await response.json();
	
	await Promise.all(pokemonData.results.map(async (pokemon) => {
	  const response = await fetch(pokemon.url);
	  const data = await response.json();
	  const pokemonInfo = {
		name: pokemon.name,
		image: data.sprites.front_default,
		types: data.types.map(type => type.type.name),
		abilities: data.abilities.map(ability => ability.ability.name)
	  };
	  pokemonDisplayData.push(pokemonInfo);
	
	}));
 
	return pokemonDisplayData;
  }

console.log(pokemonDisplayData);



export function createPokemonCards (pokemonDisplayData) {
  pokemonDisplayData.forEach(pokemon => {
	
	// Detta är vad som ska finnas i varje pokemon-card sedan ska innehållet bytas ut beroende på vilken pokémon som visas.
	
	const pokemonCardContent = {
		pokemonCard: document.createElement('div'),
		pokemonName: document.createElement('h2'),
		pokemonImage: document.createElement('img'),
		pokemonRecruitButton: document.createElement('button')
	}  
	
	// Här behöver jag skapa en eventlyssnare på knappen "rekrytera till team", Den behöver spara pokémon-kortet i en array som jag sedan kan visa i "Team-vyn" 
	
	pokemonCardContent.pokemonRecruitButton.addEventListener('click', () => {
		console.log('Du la till en pokemon i din lista');
		
		recruitedPokemon.push (
			pokemon);
		console.log(recruitedPokemon);
		
	})

	
	
	// Skapar klassnamn för styling av pokémon-card
	
	pokemonCardContent.pokemonCard.className = 'pokemon-card'
	pokemonCardContent.pokemonName.className = 'pokemon-head'
	pokemonCardContent.pokemonRecruitButton.className = 'pokemon-recruit-btn'
	pokemonCardContent.pokemonImage.className = 'pokemon-img'
	
	pokemonCardContent.pokemonName.innerText = pokemon.name;
	pokemonCardContent.pokemonImage.src = pokemon.image;
	pokemonCardContent.pokemonRecruitButton.innerText = 'Rekrytera till ditt team'
	
	// Lägger till innehållet i pokemon-card
	pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonName)
	pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonImage)
	pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonRecruitButton)
	
	// Lägger till pokémon-card i en större container för att lättare positionera ut
	pokemonCardContainer.append(pokemonCardContent.pokemonCard)

 })

console.log(recruitedPokemon)

}
;

	
	// Loopar igenom arrayen och skapar pokemon-kort för varje element.
export function createRecruitedCards(pokemonList) {
	

	pokemonList.forEach(recruitedPokemon => {
		console.log(recruitedPokemon);
		let pokemonCardContentTeamMember = {
			pokemonCard: document.createElement('div'),
			pokemonName: document.createElement('h2'),
			pokemonImage: document.createElement('img'),
			pokemonYourName: document.createElement('h3'),
			pokemonInputName: document.createElement('input'),
			pokemonOutputName: document.createElement('p'),
			pokemonRemoveButton: document.createElement('button')
		} 

		let pokemonOutputName = pokemonCardContentTeamMember.pokemonInputName.value

		// Klassnamn:
		pokemonCardContentTeamMember.pokemonCard.className = 'pokemon-card'
		pokemonCardContentTeamMember.pokemonName.className = 'pokemon-head'
		pokemonCardContentTeamMember.pokemonRemoveButton.className = 'pokemon-remove-btn'
		pokemonCardContentTeamMember.pokemonImage.className = 'pokemon-img'
		pokemonCardContentTeamMember.pokemonYourName.className = 'your-pokemon-name'
		pokemonCardContentTeamMember.pokemonInputName.className = 'pokemon-input-name'
		pokemonCardContentTeamMember.pokemonOutputName.className = 'pokemon-output-name'


	// Innehåll:
		pokemonCardContentTeamMember.pokemonRemoveButton.innerText = 'Ta bort från ditt team'
		pokemonCardContentTeamMember.pokemonName.innerText = recruitedPokemon.name;
		pokemonCardContentTeamMember.pokemonImage.src = recruitedPokemon.image;
		pokemonCardContentTeamMember.pokemonYourName.innerText = 'Välj ett namn till din pokémon: '
	
	
		pokemonCardContentTeamMember.pokemonInputName.addEventListener('keydown', function (event) {
			
			if (event.key === "Enter") {
				console.log('Du tryckte på Enter');
				console.log(pokemonOutputName);
				pokemonOutputName = this.value
				pokemonCardContentTeamMember.pokemonOutputName.innerText = pokemonOutputName

				pokemonCardContentTeamMember.pokemonCard.insertBefore(pokemonCardContentTeamMember.pokemonOutputName, pokemonCardContentTeamMember.pokemonImage);

				pokemonCardContentTeamMember.pokemonInputName.remove()
				pokemonCardContentTeamMember.pokemonYourName.remove()
				
			}
		})
			

	// Lägga till i DOM:
	pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonYourName)
	pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonInputName)
	pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonName)
	
	pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonImage)
	pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonRemoveButton)
	yourTeamContainer.append(pokemonCardContentTeamMember.pokemonCard)


	pokemonCardContentTeamMember.pokemonRemoveButton.addEventListener('click', () => {
			console.log('Kicka från team');
				
			})
			
	})

}
	


