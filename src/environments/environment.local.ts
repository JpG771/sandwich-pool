import { FirebaseSandwichService } from 'src/db/firebase/services/sandwich.service';
import { FirebaseReservationService } from 'src/db/firebase/services/reservation.service';
import { FirebaseModule } from 'src/db/firebase/firebase.module';
import { FirebaseAuthenticateService } from 'src/db/firebase/services/firebase-authenticate.service';

export const environment = {
  production: true,
  additionnalModules: [FirebaseModule],
  services: {
    sandwichService: FirebaseSandwichService,
    reservationService: FirebaseReservationService,
    userService: FirebaseAuthenticateService
  },
  contactEmail: '',
  domain: 'localhost:4200',
};
