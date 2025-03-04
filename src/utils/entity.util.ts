// src/utils/entity.util.ts

/**
 * Formats population numbers to be more readable
 * @param population Population as string
 * @returns Formatted population string
 */
export const formatPopulation = (population: string): string => {
  if (population.toLowerCase() === "unknown") {
    return "Unknown";
  }

  const num = parseInt(population, 10);

  if (isNaN(num)) {
    return population;
  }

  if (num < 1_000_000) {
    return num.toLocaleString();
  }

  if (num < 1_000_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }

  if (num < 1_000_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }

  return `${(num / 1_000_000_000_000).toFixed(1)}T`;
};

/**
 * Formats credits to be more readable
 * @param credits Credits as string
 * @returns Formatted credits string
 */
export const formatCredits = (credits: string): string => {
  if (credits.toLowerCase() === "unknown") {
    return "Unknown";
  }

  const num = parseInt(credits, 10);

  if (isNaN(num)) {
    return credits;
  }

  return num.toLocaleString();
};

/**
 * Formats length measurement to be more readable
 * @param length Length as string
 * @returns Formatted length string
 */
export const formatLength = (length: string): string => {
  if (length.toLowerCase() === "unknown") {
    return "Unknown";
  }

  const num = parseFloat(length);

  if (isNaN(num)) {
    return length;
  }

  // Add meters unit to the length
  return `${num} m`;
};

/**
 * Returns a string with first item or joined items
 * @param items Array of items
 * @returns String representation
 */
export const formatArrayItems = (items: string[]): string => {
  if (!items?.length) {
    return "Unknown";
  }

  if (items.length === 1) {
    return items[0];
  }

  return items.join(", ");
};
