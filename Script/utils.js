// Sökfunktionen!!
import { showRecruitedPokemon } from "./script.js";
import { addToTeam} from "./script.js";
const pokemonCardContainer = document.querySelector(".pokemon-card-container");
const input = document.querySelector("#pokemon-search");
let pokemonSearchResult = [];
const url = "https://pokeapi.co/api/v2/pokemon/?limit=1279";
const response = await fetch(url);
const pokemonData = await response.json();
let searchValue = "";
const pokemonImageData = {};


// Detta plockar ut bilden och lägger den i ett objekt så att den inte ska hämtas varje gång appen körs
await Promise.all(
  pokemonData.results.map(async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    pokemonImageData[pokemon.name] = data.sprites.front_default;

  })
);


input.addEventListener("keyup", (event) => {
  searchValue = event.target.value.toLowerCase();
  console.log(searchValue);

  pokemonSearchResult = [];
  pokemonData.results.forEach((pokemon) => {
    if (pokemon.name.includes(searchValue) && !pokemon.name.includes('-')) {
      pokemonSearchResult.push({
        name: pokemon.name,
        image: pokemonImageData[pokemon.name],
		
		
      });
    }
  });
  displayPokemon();
  console.log(pokemonSearchResult);
});

export function displayPokemon() {
  pokemonCardContainer.innerHTML = "";
  pokemonSearchResult.forEach((pokemonName) => {
   

    let pokemonCardContent = {
      pokemonCard: document.createElement("div"),
      pokemonName: document.createElement("h2"),
      pokemonImage: document.createElement("img"),
      pokemonRecruitButton: document.createElement("button"),
	  
    };

    // Här behöver jag skapa en eventlyssnare på knappen "rekrytera till team", Den behöver spara pokémon-kortet i en array som jag sedan kan visa i "Team-vyn"

    pokemonCardContent.pokemonRecruitButton.addEventListener("click", () => {
      console.log("Du la till en pokemon i din lista");

      addToTeam(pokemonName.name, pokemonName.image)

    });

    // Skapar klassnamn för styling av pokémon-card

    pokemonCardContent.pokemonCard.className = "pokemon-card";
    pokemonCardContent.pokemonName.className = "pokemon-head";
    pokemonCardContent.pokemonRecruitButton.className = "pokemon-recruit-btn";
    pokemonCardContent.pokemonImage.className = "pokemon-img";
	

	
    pokemonCardContent.pokemonName.innerText = pokemonName.name;
    pokemonCardContent.pokemonImage.src = pokemonName.image;
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
  });
}
