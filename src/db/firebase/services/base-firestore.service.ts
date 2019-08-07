import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/core/models/entity';
import { setObjectId } from '../utils/firebase.util';

export class BaseFirestoreService<T extends Entity> {

  protected itemsCollection: AngularFirestoreCollection<T>;

  constructor(protected firestoreService: AngularFirestore, collectionName: string) {
    this.itemsCollection = this.firestoreService.collection<T>(collectionName);
  }

  get(id: string): Observable<T> {
    return this.itemsCollection.doc(id).valueChanges().pipe(
        map(item => ({ ...item, id } as T))
      );
  }
  getAll(): Observable<Array<T>> {
    return this.itemsCollection.valueChanges({ idField: '' }).pipe(
      map(items => items.map(setObjectId)));
  }
  add(value: T): Observable<T> {
    const id = this.firestoreService.createId();
    const newItem: T = {
      ...value,
      id
    };
    return from(this.itemsCollection.doc(id).set(newItem)).pipe(
      map(() => value)
    );
  }
  edit(value: T): Observable<T> {
    return from(this.itemsCollection.doc(value.id).set(value)).pipe(
      map(() => value)
    );
  }
  remove(value: T): Observable<boolean> {
    return from(this.itemsCollection.doc(value.id).delete()).pipe(
      map(() => true)
    );
  }
}
