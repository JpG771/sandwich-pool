/**
 * A user is someone who use the application.
 */
export interface User {
  // Unique identifier of the user.
  id: string;
  // Link to a profile picture.
  picture?: string;
  // Global review score of the user.
  globalScore: number;
}
