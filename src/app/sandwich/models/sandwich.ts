import { Entity } from 'src/app/core/models/entity';
import { Address } from 'src/app/shared/models/address';

/**
 * A Sandwich is meal that can be shared.
 */
export interface Sandwich extends Entity {
  /** Who is offering this sandwich. */
  userId: string;
  /** Short title to represent the sandwich and quickly know what is offered. */
  title: string;
  /** Longer description of the sandwich describing what is offered. */
  description?: string;
  /** Link to an image for the sandwich main picture */
  thumbnail?: string;
  /** Price of the sandwich. Can have decimals. */
  price: number;
  /** A sandwich can be in multiple portions. This is the original quantity. */
  quantity: number;
  /** How much of the original quantity is left. */
  quantityLeft?: number;
  /** Kind of sandwich or category of sandwich. */
  type: string;
  /** Multiple tags related to the sandwich. Ex: Gourmet, Vegetarian, Cheap, Bread, Chicken, etc. */
  tags?: Array<string>;
  /** Address object */
  address: Address;
  /** More detail on the address */
  addressDetail?: string;
  /** Date of the sandwich creation */
  dateCreated?: string;
  /** When the user saved a change to the sandwich */
  dateModified?: string;
  /** When the sandwich will be picked up */
  datePickUp?: string;
  /** Last time a user can reserve this sandwich */
  dateLimit?: string;
}
