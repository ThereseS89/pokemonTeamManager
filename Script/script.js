	
	
	const pokemonButton = document.querySelector('#pokemon-btn') 
	const teamButton = document.querySelector('#team-btn')
	const input = document.querySelector('#pokemon-search')
	const searchButton = document.querySelector('#search-btn')
	const pokemonCardContainer = document.querySelector('.pokemon-card-container')
	const yourTeamContainer = document.querySelector('.your-team-container')
	let recruitedPokemon = [];
	
// Pokémons-knappen ska visa pokémons som man kan välja samt att vyn för att söka pokémons ska visas.
	
	pokemonButton.addEventListener('click', async () => {
		yourTeamContainer.parentNode.replaceChild(pokemonCardContainer, yourTeamContainer)
		const urlpokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
		const response = await fetch(urlpokemon)
		const pokemonData = await response.json()
		
		console.log('Du klickade på knappen');
		console.log(pokemonData.results)

		let pokemonCardContent;
		
		// loopar igenom en lista om 20 pokemons som visas, och skapar pokémon-cards för varje pokémon
		for (let i = 0; i < pokemonData.results.length; i++) {
			
			// Tar fram bilden från varje pokemons enskilda data
			const pokemonImageSrc = pokemonData.results[i].url
			const responseImg = await fetch(pokemonImageSrc);
			const pokemonImageData = await responseImg.json();

			
		// Detta är vad som ska finnas i varje pokemon-card sedan ska innehållet bytas ut beroende på vilken pokémon som visas.

			pokemonCardContent = {
				pokemonCard: document.createElement('div'),
				pokemonName: document.createElement('h2'),
				pokemonImage: document.createElement('img'),
				pokemonRecruitButton: document.createElement('button')
			}  

		// Här behöver jag skapa en eventlyssnare på knappen "rekrytera till team", Den behöver spara pokémon-kortet i en array som jag sedan kan visa i "Team-vyn" 

			pokemonCardContent.pokemonRecruitButton.addEventListener('click', () => {
					console.log('Du la till en pokemon i din lista');
					recruitedPokemon.push ({
						name: pokemonData.results[i].name,
						image: pokemonImageData.sprites.front_default
					});
					console.log(recruitedPokemon);
		
				})
			
		// Skapar klassnamn för styling av pokémon-card
			
			pokemonCardContent.pokemonCard.className = 'pokemon-card'
			pokemonCardContent.pokemonName.className = 'pokemon-head'
			pokemonCardContent.pokemonRecruitButton.className = 'pokemon-recruit-btn'
			pokemonCardContent.pokemonImage.className = 'pokemon-img'
			
			pokemonCardContent.pokemonName.innerText = pokemonData.results[i].name;
			pokemonCardContent.pokemonImage.src = pokemonImageData.sprites.front_default;
			pokemonCardContent.pokemonRecruitButton.innerText = 'Rekrytera till ditt team'
			
		// Lägger till innehållet i pokemon-card
			pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonName)
			pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonImage)
			pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonRecruitButton)
			
		// Lägger till pokémon-card i en större container för att lättare positionera ut
			pokemonCardContainer.append(pokemonCardContent.pokemonCard)
		}

	})
		

// Team-knappen ska byta vy och visa vilka pokémons som är valda, pokémonen ska här visa sina abilities och det ska vara möjligt att kicka sin pokémon från teamet.


	teamButton.addEventListener('click', () => {
		console.log(recruitedPokemon);
		pokemonCardContainer.parentNode.replaceChild(yourTeamContainer, pokemonCardContainer)

		recruitedPokemon.forEach(recruitedPokemon => {
		let pokemonCardContentTeamMember = {
			pokemonCard: document.createElement('div'),
			pokemonName: document.createElement('h2'),
			pokemonImage: document.createElement('img'),
			pokemonRemoveButton: document.createElement('button')
		} 
		
			pokemonCardContentTeamMember.pokemonCard.className = 'pokemon-card'
			pokemonCardContentTeamMember.pokemonName.className = 'pokemon-head'
			pokemonCardContentTeamMember.pokemonRemoveButton.className = 'pokemon-remove-btn'
			pokemonCardContentTeamMember.pokemonImage.className = 'pokemon-img'
			pokemonCardContentTeamMember.pokemonRemoveButton.innerText = 'Ta bort från ditt team'

			pokemonCardContentTeamMember.pokemonName.innerText = recruitedPokemon.name;
			pokemonCardContentTeamMember.pokemonImage.src = recruitedPokemon.image;
		
			pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonName)
			pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonImage)
			pokemonCardContentTeamMember.pokemonCard.append(pokemonCardContentTeamMember.pokemonRemoveButton)
			
		
			yourTeamContainer.append(pokemonCardContentTeamMember.pokemonCard)
		})
	})
	
