import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from 'src/app/sandwich/models/reservation';
import { ReservationService } from 'src/app/sandwich/models/reservation-service';
import { setObjectId } from '../utils/firebase.util';
import { BaseFirestoreService } from './base-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseReservationService extends BaseFirestoreService<Reservation> implements ReservationService {

  private static COLLECTION_NAME = 'reservation';

  constructor(firestoreService: AngularFirestore) {
    super(firestoreService, FirebaseReservationService.COLLECTION_NAME);
  }

  getAllForSandwich(sandwichId: string): Observable<Array<Reservation>> {
    return this.firestoreService.collection(FirebaseReservationService.COLLECTION_NAME, ref => ref.where('sandwichId', '==', sandwichId))
      .valueChanges({ idField: '' }).pipe(map(items => items.map(setObjectId)));
  }
}
