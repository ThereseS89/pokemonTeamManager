	
	
	const pokemonButton = document.querySelector('#pokemon-btn') 
	const input = document.querySelector('#pokemon-search')
	const searchButton = document.querySelector('#search-btn')
	const pokemonCardContainer = document.querySelector('.pokemon-card-container')
	
	
	pokemonButton.addEventListener('click', async () => {
		const urlpokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
		const response = await fetch(urlpokemon)
		const pokemonData = await response.json()
		
		console.log('Du klickade på knappen');
		console.log(pokemonData.results)
		
		// loopar igenom en lista om 20 pokemons som visas, och skapar pokémon-cards för varje pokémon
		for (let i = 0; i < pokemonData.results.length; i++) {
			
			// Tar fram bilden från varje pokemons enskilda data
			const pokemonImageSrc = pokemonData.results[i].url
			const responseImg = await fetch(pokemonImageSrc);
			const pokemonImageData = await responseImg.json();
			console.log(pokemonImageData);
			
			// Detta är vad som ska finnas i varje pokemon-card sedan ska innehållet bytas ut beroende på vilken pokémon som visas.
			let pokemonCardContent = {
				pokemonCard: document.createElement('div'),
				pokemonName: document.createElement('h2'),
				pokemonImage: document.createElement('img'),
				pokemonRecruitButton: document.createElement('button')
			}  
			
			
			
			// Skapar klassnamn för styling av pokémon-card
			
			pokemonCardContent.pokemonCard.className = 'pokemon-card'
			pokemonCardContent.pokemonName.className = 'pokemon-head'
			pokemonCardContent.pokemonRecruitButton.className = 'pokemon-recruit-btn'
			pokemonCardContent.pokemonImage.className = 'pokemon-img'
			
			pokemonCardContent.pokemonName. innerText = pokemonData.results[i].name;
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
	
	const event = new Event('click');
	pokemonButton.dispatchEvent(event);
