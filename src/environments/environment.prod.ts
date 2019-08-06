import { FirebaseSandwichService } from 'src/db/firebase/services/sandwich.service';
import { FirebaseReservationService } from 'src/db/firebase/services/reservation.service';

export const environment = {
  production: true,
  sandwichService: FirebaseSandwichService,
  reservationService: FirebaseReservationService
};
