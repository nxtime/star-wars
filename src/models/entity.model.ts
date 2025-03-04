export enum ForceAlignment {
  LIGHT = "light",
  DARK = "dark",
  NEUTRAL = "neutral"
}

export enum CharacterStatus {
  ALIVE = "alive",
  DECEASED = "deceased",
  UNKNOWN = "unknown"
}

export interface BaseEntity {
  id: string;
  name: string;
  imagePlaceholder: string;
  imageUrl: string;
}

export interface Character extends BaseEntity {
  role: string;
  affiliationId: string;
  affiliations: string[];
  speciesId: string;
  species: string;
  homeWorldId: string;
  homeWorld: string;
  birthYear: string;
  vehicles: string[];
  starships: string[];
  weapons: string[];
  isForceUser: boolean;
  forceAlignment?: ForceAlignment;
  appearances: string[];
  status: CharacterStatus;
  alternateIdentity?: string;
}

export interface Planet extends BaseEntity {
  affiliationId: string;
  sector: string;
  system: string;
  appearances: string[];
  region: string;
  climate: string[];
  terrain: string[];
  population: string;
  notable_residents: string[];
}

export interface Vehicle extends BaseEntity {
  model: string;
  manufacturer: string;
  class: string;
  type: string;
  crew: string;
  passengers: string;
  cost_in_credits: string;
  length: string;
  max_speed: string;
  affiliationId: string;
  pilots: string[];
  appearances: string[];
}

export interface Starship extends BaseEntity {
  model: string;
  manufacturer: string;
  class: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  armament: string[];
  affiliationId: string;
  pilots: string[];
  appearances: string[];
  special_features: string[];
}
export interface Affiliation {
  id: string;
  name: string;
  type: string;
  description: string;
  foundingYear?: string;
  dissolutionYear?: string;
  leader?: string;
  members: string[];
  appearances: string[];
  imagePlaceholder: string;
}

export interface Species {
  id: string;
  name: string;
  classification: string;
  designation: string;
  averageHeight: string;
  averageLifespan: string;
  homeworld?: string;
  language: string;
  skinColors: string[];
  hairColors: string[];
  eyeColors: string[];
  notable_members: string[];
  imagePlaceholder: string;
}

export interface Movie {
  id: string;
  episodeId: string;
  title: string;
  director: string;
  releaseDate: string;
  openingCrawl: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}
