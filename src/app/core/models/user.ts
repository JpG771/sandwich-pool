import { Entity } from './entity';

/**
 * A user is someone who use the application.
 */
export interface User extends Entity {
  // Link to a profile picture.
  picture?: string;
  // Global review score of the user.
  globalScore: number;
}
