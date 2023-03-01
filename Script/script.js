	 import { displayPokemon } from "./utils.js";
	const main = document.querySelector('main')
	const pokemonButton = document.querySelector('#pokemon-btn') 
	const teamButton = document.querySelector('#team-btn')
	const input = document.querySelector('#pokemon-search')
	const searchWrapper = document.querySelector('.search-wrapper')
	const pokemonCardContainer = document.querySelector('.pokemon-card-container')
	const yourTeamContainer = document.querySelector('.your-team-container')
	const yourReservesContainer = document.querySelector('.your-reserves-container')
	let recruitedPokemon = [];
	let pokemonSearchResult = [];
	
	
// Pokémons-knappen ska visa pokémons som man kan välja samt att vyn för att söka pokémons ska visas.
	
	pokemonButton.addEventListener('click', async () => {
		searchWrapper.classList.remove('invisible')
		pokemonCardContainer.classList.remove('invisible')
		yourTeamContainer.classList.add('invisible')
		yourReservesContainer.classList.add('invisible')
	
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

		};
			
	});	
 

// Team-knappen ska byta vy och visa vilka pokémons som är valda, pokémonen ska här visa sina abilities och det ska vara möjligt att kicka sin pokémon från teamet.

	let pokemonCardContentTeamMember;

	teamButton.addEventListener('click', () => {
			searchWrapper.classList.add('invisible')
		console.log(recruitedPokemon);
			pokemonCardContainer.classList.add('invisible')
			yourTeamContainer.classList.remove('invisible')
			yourReservesContainer.classList.remove('invisible')
		let recruitMorePokemonContainer = document.createElement('div')
		let recruitMorePokemonText = document.createElement('p')

		if (recruitedPokemon.length < 3) {
			recruitMorePokemonContainer.className = 'recruit-more-pokemon-container'
			main.append(recruitMorePokemonContainer)
			recruitMorePokemonText.className = 'recruit-more-pokemon'
			recruitMorePokemonText.innerText = 'Du behöver ha minst tre pokémons i ditt team, rekrytera fler!'
			recruitMorePokemonContainer.append(recruitMorePokemonText)


		} else  {	
			let recruitMorePokemonContainers = document.querySelectorAll('.recruit-more-pokemon-container')
        	recruitMorePokemonContainers.forEach(container => container.remove())
			
			// Loopar igenom arrayen och skapar pokemon-kort för varje element.

			recruitedPokemon.forEach(recruitedPokemon => {
		
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
						recruitedPokemon.splice(recruitedPokemon, 1)
					})
					
			})
		}
	
	})	

	
			

		// 1. Jag behöver veta vilken knapp som är i vilket card så att den vet vilket element i arrayen som den ska ta bort.
		// 2. Sen behöver den välja ut den och ta bort den
		// 3. Se behöver texten att man har för få pokemons i laget komma up