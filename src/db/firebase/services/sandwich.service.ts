import { Injectable } from '@angular/core';
import { SandwichService } from 'src/app/sandwich/models/sandwich-service';
import { Sandwich } from 'src/app/sandwich/models/sandwich';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseFirestoreService } from './base-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseSandwichService extends BaseFirestoreService<Sandwich> implements SandwichService {

  constructor(firestoreService: AngularFirestore) {
    super(firestoreService, 'sandwich');
  }
}
