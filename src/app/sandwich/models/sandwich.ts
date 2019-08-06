/**
 * A Sandwich is meal that can be shared.
 */
export interface Sandwich {
  // Unique identifier for the sandwich.
  id?: string;
  // Who is offering this sandwich.
  userId: string;
  // Short title to represent the sandwich and quickly know what is offered.
  title: string;
  // Longer description of the sandwich describing what is offered.
  description?: string;
  // Link to an image for the sandwich main picture
  thumbnail?: string;
  // Price of the sandwich. Can have decimals.
  price: number;
  // A sandwich can be in multiple quantities.
  quantity: number;
  // Kind of sandwich or category of sandwich.
  type: string;
  // Multiple tags related to the sandwich. Ex: Gourmet, Vegetarian, Cheap, Bread, Chicken, etc.
  tags?: Array<string>;
}
