export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: string;

  productId: string;
  userId: string;

  rating: Rating; // ⭐ strict 1–5
  comment: string;

  isEdited?: boolean;

  createdAt: Date;
  updatedAt?: Date;
}