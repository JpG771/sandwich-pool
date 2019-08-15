import { FirebaseModule } from 'src/db/firebase/firebase.module';
import { FirebaseAuthenticateService } from 'src/db/firebase/services/firebase-authenticate.service';
import { FirebaseReservationService } from 'src/db/firebase/services/reservation.service';
import { FirebaseSandwichService } from 'src/db/firebase/services/sandwich.service';
import { secrets } from './secrets';

export const environment = {
  production: false,
  additionnalModules: [FirebaseModule],
  services: {
    sandwichService: FirebaseSandwichService,
    reservationService: FirebaseReservationService,
    userService: FirebaseAuthenticateService
  },
  contactEmail: secrets.contactEmail,
  domain: secrets.localDomain,
  mapsApi: secrets.mapsApi
};
