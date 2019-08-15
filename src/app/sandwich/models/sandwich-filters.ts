import { Address } from 'src/app/shared/models/address';

/**
 * Object listing the filtering values for a list of sandwiches.
 */
export interface SandwichFilter {
  // Title containing this string.
  title?: string;
  // Minimum price of the sandwich. Can have decimals.
  minPrice?: number;
  // Maximum price of the sandwich. Can have decimals.
  maxPrice?: number;
  // Minimum quantity left of the sandwich.
  quantity: number;
  // Kind of sandwich or category of sandwich.
  type?: Array<string>;
  // Multiple tags related to the sandwich. Ex: Gourmet, Vegetarian, Cheap, Bread, Chicken, etc.
  tags?: Array<string>;
  // Address to compare to with the maximum distance.
  address?: Address;
  // Maximum distance from the address.
  distance?: number;
  // Display sandwich available after or at this date.
  dateFrom?: number;
  // Hide sandwich that are only available after this date.
  dateTo?: number;
}
