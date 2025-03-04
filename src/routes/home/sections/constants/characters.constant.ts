import { Character, CharacterStatus, ForceAlignment } from "@/models/entity.model";

export const landingCharactersData: Character[] = [
  {
    "id": "1",
    "name": "Luke Skywalker",
    "role": "Jedi Knight",
    "affiliationId": "1",
    "affiliations": ["Rebel Alliance", "Jedi Order"],
    "speciesId": "1",
    "species": "Human",
    "homeWorldId": "1",
    "homeWorld": "Tatooine",
    "birthYear": "19 BBY",
    "vehicles": ["5", "14"],
    "starships": ["12", "22"],
    "weapons": ["Lightsaber", "Blaster"],
    "imagePlaceholder": "#4d7298",
    "imageUrl": "luke_skywalker.png",
    "isForceUser": true,
    "forceAlignment": ForceAlignment.LIGHT,
    "appearances": ["4", "5", "6", "7", "8", "9"],
    "status": CharacterStatus.DECEASED
  },
  {
    "id": "2",
    "name": "Darth Vader",
    "role": "Sith Lord",
    "affiliationId": "3",
    "affiliations": ["Galactic Empire", "Sith Order"],
    "speciesId": "1",
    "species": "Human",
    "homeWorldId": "1",
    "homeWorld": "Tatooine",
    "birthYear": "41.9 BBY",
    "vehicles": [],
    "starships": ["13"],
    "weapons": ["Lightsaber", "Force choke"],
    "imagePlaceholder": "#000000",
    "imageUrl": "darth_vader.png",
    "isForceUser": true,
    "forceAlignment": ForceAlignment.DARK,
    "appearances": ["4", "5", "6", "3"],
    "status": CharacterStatus.DECEASED
  },
  {
    "id": "3",
    "name": "Leia Organa",
    "role": "Princess, General",
    "affiliationId": "1",
    "affiliations": ["Rebel Alliance", "Resistance", "New Republic"],
    "speciesId": "1",
    "species": "Human",
    "homeWorldId": "2",
    "homeWorld": "Alderaan",
    "birthYear": "19 BBY",
    "vehicles": [],
    "starships": [],
    "weapons": ["Blaster Pistol", "Diplomatic skills"],
    "imagePlaceholder": "#8e736f",
    "imageUrl": "leia_organa.png",
    "isForceUser": true,
    "forceAlignment": ForceAlignment.LIGHT,
    "appearances": ["4", "5", "6", "7", "8", "9"],
    "status": CharacterStatus.DECEASED
  },
  {
    "id": "4",
    "name": "Han Solo",
    "role": "Smuggler, General",
    "affiliationId": "1",
    "affiliations": ["Rebel Alliance", "New Republic"],
    "speciesId": "1",
    "species": "Human",
    "homeWorldId": "22",
    "homeWorld": "Corellia",
    "birthYear": "29 BBY",
    "vehicles": [],
    "starships": ["10"],
    "weapons": ["DL-44 Blaster Pistol"],
    "imagePlaceholder": "#523d28",
    "imageUrl": "han_solo.png",
    "isForceUser": false,
    "appearances": ["4", "5", "6", "7"],
    "status": CharacterStatus.DECEASED
  }
];
