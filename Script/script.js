import { displayPokemon } from "./utils.js";
const main = document.querySelector("main");
const pokemonButton = document.querySelector("#pokemon-btn");
const teamButton = document.querySelector("#team-btn");
const input = document.querySelector("#pokemon-search");
const searchWrapper = document.querySelector(".search-wrapper");
const pokemonCardContainer = document.querySelector(".pokemon-card-container");
const yourTeamContainer = document.querySelector(".your-team-container");
let recruitMorePokemonContainer = document.createElement("div");
  let recruitMorePokemonText = document.createElement("p");

const startSection = document.querySelector('.start-section')
let recruitedPokemon = [];
const infoText = document.querySelector('.info')



export function addToTeam (pokemonName, pokemonImage,) {
	recruitedPokemon.push({
        name: pokemonName,
        image: pokemonImage,
		

      });
	  console.log(recruitedPokemon);
}

// Pokémons-knappen ska visa pokémons som man kan välja samt att vyn för att söka pokémons ska visas.
// Begränsar API så att den inte gör kort för alla 1279 pokemon. I sökfunktionen kan man söka i hela listan men den visar inte pokemon som innehåller -.

const urlpokemon = "https://pokeapi.co/api/v2/pokemon/?limit=50";
  const response = await fetch(urlpokemon);
  const pokemonData = await response.json();
	
	
pokemonButton.addEventListener("click", async () => {
	startSection.classList.add('invisible')
  searchWrapper.classList.remove("invisible");
  pokemonCardContainer.classList.remove("invisible");
  yourTeamContainer.classList.add("invisible");
  recruitMorePokemonContainer.classList.add('invisible')
  infoText.classList.remove('invisible')
  

  console.log("Du klickade på knappen");
  console.log(pokemonData.results);

  let pokemonCardContent;

  // loopar igenom en lista om 20 pokemons som visas, och skapar pokémon-cards för varje pokémon
  for (let i = 0; i < pokemonData.results.length; i++) {
    // Tar fram bilden från varje pokemons enskilda data
    const pokemonImageSrc = pokemonData.results[i].url;
    const responseImg = await fetch(pokemonImageSrc);
    const pokemonImageData = await responseImg.json();

    // Detta är vad som ska finnas i varje pokemon-card sedan ska innehållet bytas ut beroende på vilken pokémon som visas.

    pokemonCardContent = {
      pokemonCard: document.createElement("div"),
      pokemonName: document.createElement("h2"),
      pokemonImage: document.createElement("img"),
      pokemonRecruitButton: document.createElement("button"),
    };

    // Här behöver jag skapa en eventlyssnare på knappen "rekrytera till team", Den behöver spara pokémon-kortet i en array som jag sedan kan visa i "Team-vyn"

    pokemonCardContent.pokemonRecruitButton.addEventListener("click", () => {
      console.log("Du la till en pokemon i din lista");
	  

	  addToTeam(pokemonData.results[i].name, pokemonImageData.sprites.front_default)
    });

    // Skapar klassnamn för styling av pokémon-card

    pokemonCardContent.pokemonCard.className = "pokemon-card";
    pokemonCardContent.pokemonName.className = "pokemon-head";
    pokemonCardContent.pokemonRecruitButton.className = "pokemon-recruit-btn";
    pokemonCardContent.pokemonImage.className = "pokemon-img";

    pokemonCardContent.pokemonName.innerText = pokemonData.results[i].name;
    pokemonCardContent.pokemonImage.src =
      pokemonImageData.sprites.front_default;
    pokemonCardContent.pokemonRecruitButton.innerText =
      "Rekrytera till ditt team";

    // Lägger till innehållet i pokemon-card
    pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonName);
    pokemonCardContent.pokemonCard.append(pokemonCardContent.pokemonImage);
    pokemonCardContent.pokemonCard.append(
      pokemonCardContent.pokemonRecruitButton
    );

    // Lägger till pokémon-card i en större container för att lättare positionera ut
    pokemonCardContainer.append(pokemonCardContent.pokemonCard);
  }
  //return recruitedPokemon;
});


// Team-knappen ska byta vy och visa vilka pokémons som är valda, pokémonen ska här visa sina abilities och det ska vara möjligt att kicka sin pokémon från teamet.

let pokemonCardContentTeamMember;

teamButton.addEventListener("click", () => {
  startSection.classList.add('invisible')
  searchWrapper.classList.add("invisible");
  pokemonCardContainer.classList.add("invisible");
  yourTeamContainer.classList.remove("invisible");
  infoText.classList.add('invisible')
  console.log(recruitedPokemon);

  showRecruitedPokemon();
});




export function showRecruitedPokemon() {
  yourTeamContainer.innerHTML = "";
  
  if (recruitedPokemon.length < 3) {
    recruitMorePokemonContainer.className = "recruit-more-pokemon-container";
    main.append(recruitMorePokemonContainer);
    recruitMorePokemonText.className = "recruit-more-pokemon";
    recruitMorePokemonText.innerText =
      "Du behöver ha minst tre pokémons i ditt team, rekrytera fler!";
    recruitMorePokemonContainer.append(recruitMorePokemonText);
  } else {

	  // Tar bort rekrytera mer pokémon-texten.
    let recruitMorePokemonContainers = document.querySelectorAll(
      ".recruit-more-pokemon-container"
    );

    recruitMorePokemonContainers.forEach((container) => container.remove());

	const yourTeam = document.createElement('h1')
	yourTeam.classList.add('head-pokemon-team')
	yourTeam.innerText = 'Ditt pokémonteam: '
	yourTeamContainer.append(yourTeam)
	
    // Loopar igenom arrayen och skapar pokemon-kort för varje element.
		let counter = 0

    recruitedPokemon.forEach((pokemon) => {
		counter++;
		console.log(recruitedPokemon);
		

      let pokemonCardContentTeamMember = {
        pokemonCard: document.createElement("div"),
        pokemonName: document.createElement("h2"),
        pokemonImage: document.createElement("img"),
        pokemonYourName: document.createElement("h3"),
        pokemonInputName: document.createElement("input"),
        pokemonOutputName: document.createElement("p"),
        pokemonRemoveButton: document.createElement("button"),
		
      };

      let pokemonOutputName =
        pokemonCardContentTeamMember.pokemonInputName.value;

      // Klassnamn:
      pokemonCardContentTeamMember.pokemonCard.className = "pokemon-card";
      pokemonCardContentTeamMember.pokemonName.className = "pokemon-head";
      pokemonCardContentTeamMember.pokemonRemoveButton.className =
        "pokemon-remove-btn";
      pokemonCardContentTeamMember.pokemonImage.className = "pokemon-img";
      pokemonCardContentTeamMember.pokemonYourName.className =
        "your-pokemon-name";
      pokemonCardContentTeamMember.pokemonInputName.className =
        "pokemon-input-name";
      pokemonCardContentTeamMember.pokemonOutputName.className =
        "pokemon-output-name";
		

      // Innehåll:
      pokemonCardContentTeamMember.pokemonRemoveButton.innerText =
        "Ta bort från ditt team";

      pokemonCardContentTeamMember.pokemonName.innerText =
        pokemon.name;
      pokemonCardContentTeamMember.pokemonImage.src = pokemon.image;
      pokemonCardContentTeamMember.pokemonYourName.innerText =
        "Välj ett namn till din pokémon: ";

      pokemonCardContentTeamMember.pokemonInputName.addEventListener(
        "keydown",
        function (event) {
          if (event.key === "Enter") {
            console.log("Du tryckte på Enter");
            console.log(pokemonOutputName);
            pokemonOutputName = this.value;
            pokemonCardContentTeamMember.pokemonOutputName.innerText =
              pokemonOutputName;

            pokemonCardContentTeamMember.pokemonCard.insertBefore(
              pokemonCardContentTeamMember.pokemonOutputName,
              pokemonCardContentTeamMember.pokemonImage
            );

            pokemonCardContentTeamMember.pokemonInputName.remove();
            pokemonCardContentTeamMember.pokemonYourName.remove();
          }
        }
      );
		
      // Lägga till i DOM:
      pokemonCardContentTeamMember.pokemonCard.append(
        pokemonCardContentTeamMember.pokemonYourName
      );
      pokemonCardContentTeamMember.pokemonCard.append(
        pokemonCardContentTeamMember.pokemonInputName
      );
      pokemonCardContentTeamMember.pokemonCard.append(
        pokemonCardContentTeamMember.pokemonName
      );

      pokemonCardContentTeamMember.pokemonCard.append(
        pokemonCardContentTeamMember.pokemonImage
      );

      pokemonCardContentTeamMember.pokemonCard.append(
        pokemonCardContentTeamMember.pokemonRemoveButton
      );
	  
	  


      yourTeamContainer.append(pokemonCardContentTeamMember.pokemonCard);
		
	  if (counter === 4) {
		const yourReserves = document.createElement('h1')
		yourReserves.classList.add('head-pokemon-reservs')
		yourReserves.innerText = 'Dina reserver: '
		yourTeamContainer.insertBefore(yourReserves, yourTeamContainer.children[4])
	  }
	  console.log(counter);
	  
	 // Eventlyssnare för ta bort knappen! 
      pokemonCardContentTeamMember.pokemonRemoveButton.addEventListener(
        "click",
        () => {
            pokemonCardContentTeamMember.pokemonCard.remove();

    // Letar upp index för att veta vilken knapp som hör till vilket pokemonCard.
    const index = recruitedPokemon.findIndex(p => p.name === pokemonCardContentTeamMember.pokemonName.innerText);

    // Tar bort elementet från arrayen
    recruitedPokemon.splice(index, 1);
        }
      );
    });
  }
}


