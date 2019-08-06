import { FirebaseSandwichService } from 'src/db/firebase/services/sandwich.service';
import { FirebaseReservationService } from 'src/db/firebase/services/reservation.service';
import { FirebaseModule } from 'src/db/firebase/firebase.module';

export const environment = {
  production: true,
  additionnalModules: [FirebaseModule],
  sandwichService: FirebaseSandwichService,
  reservationService: FirebaseReservationService
};
