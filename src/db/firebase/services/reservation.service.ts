import { Injectable } from '@angular/core';
import { ReservationService } from 'src/app/sandwich/models/reservation-service';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/sandwich/models/reservation';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseFirebaseService } from './base-firebase.service.spec';
import { map } from 'rxjs/operators';
import { setObjectId } from '../utils/firebase.util';

@Injectable({
  providedIn: 'root'
})
export class FirebaseReservationService extends BaseFirebaseService<Reservation> implements ReservationService {

  private static COLLECTION_NAME = 'reservation';

  constructor(firestoreService: AngularFirestore) {
    super(firestoreService, FirebaseReservationService.COLLECTION_NAME);
  }

  getAllForSandwich(sandwichId: string): Observable<Reservation[]> {
    return this.firestoreService.collection(FirebaseReservationService.COLLECTION_NAME, ref => ref.where('sandwichId', '==', sandwichId))
      .valueChanges({ idField: '' }).pipe(map(items => items.map(setObjectId)));
  }
}
