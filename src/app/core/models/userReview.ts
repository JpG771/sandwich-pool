/**
 * Score given to a user to keep users from delivering good quality and respecting others.
 */
export interface UserReview {
  // Who the review is for.
  userId: string;
  // Who did the review.
  reviewerId: string;
  // Score of the review.
  score: number;
  // Title of the review.
  title: string;
  // Why the score was given.
  description: string;
}
