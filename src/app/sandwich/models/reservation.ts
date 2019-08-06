import { Entity } from 'src/app/core/models/entity';

export interface Reservation extends Entity {
  sandwichId: string;
  userId: string;
  quantity: number;
}
