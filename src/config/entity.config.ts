import { FC } from 'react';
import { Routes } from '@/models/routes.model';
import { BaseEntity, Character, Planet, Starship, Vehicle } from '@/models/entity.model';

// Import all card components
import { CharacterCard, CharacterDetail, PlanetCard, PlanetDetail, StarshipCard, StarshipDetail, VehicleCard, VehicleDetail } from '@/ui/components/entity';

// Import all detail components

export interface EntityPageConfig<T extends BaseEntity> {
  queryKey: string;
  title: string;
  entityType: string;
  CardComponent: FC<T>;
  DetailComponent: FC<T>;
  endpoint: string;
  subtitle: string;
  loadingMessage: string;
  itemsPerPage?: number;
}

export type EntityConfigMap = {
  [key in Routes]?: EntityPageConfig<any>;
};

const entityPageConfigs: EntityConfigMap = {
  [Routes.CHARACTER]: {
    queryKey: 'characters',
    title: 'Star Wars Characters',
    entityType: 'character',
    CardComponent: CharacterCard as FC<Character>,
    DetailComponent: CharacterDetail as FC<Character>,
    endpoint: 'characters',
    subtitle: 'In a galaxy full of characters, these are the ones that stand out.',
    loadingMessage: 'Loading characters...',
    itemsPerPage: 9
  },

  [Routes.PLANET]: {
    queryKey: 'planets',
    title: 'Star Wars Planets',
    entityType: 'planet',
    CardComponent: PlanetCard as FC<Planet>,
    DetailComponent: PlanetDetail as FC<Planet>,
    endpoint: 'planets',
    subtitle: 'Explore the diverse worlds that make up the Star Wars galaxy.',
    loadingMessage: 'Loading planets...',
    itemsPerPage: 9
  },

  [Routes.VEHICLE]: {
    queryKey: 'vehicles',
    title: 'Star Wars Vehicles',
    entityType: 'vehicle',
    CardComponent: VehicleCard as FC<Vehicle>,
    DetailComponent: VehicleDetail as FC<Vehicle>,
    endpoint: 'vehicles',
    subtitle: 'From speeder bikes to walkers, discover the iconic ground vehicles of Star Wars.',
    loadingMessage: 'Loading vehicles...',
    itemsPerPage: 8
  },

  [Routes.STARSHIP]: {
    queryKey: 'starships',
    title: 'Star Wars Starships',
    entityType: 'starship',
    CardComponent: StarshipCard as FC<Starship>,
    DetailComponent: StarshipDetail as FC<Starship>,
    endpoint: 'starships',
    subtitle: 'From the Millennium Falcon to Star Destroyers, explore the legendary vessels of the galaxy.',
    loadingMessage: 'Loading starships...',
    itemsPerPage: 6
  }
};

/**
 * Gets the configuration for an entity page based on the current route
 * @param route Current route from the router
 * @returns Configuration object for the EntityPage component or undefined if not found
 */
export const getEntityPageConfig = (route: Routes): EntityPageConfig<any> | undefined => {
  return entityPageConfigs[route];
};

export default entityPageConfigs;
