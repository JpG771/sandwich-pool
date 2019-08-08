import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/core/models/entity';

export class BaseFirestoreService<T extends Entity> {

  protected itemsCollection: AngularFirestoreCollection<T>;

  constructor(protected firestoreService: AngularFirestore, collectionName: string) {
    this.itemsCollection = this.firestoreService.collection<T>(collectionName);
  }

  get(id: string): Observable<T> {
    return this.itemsCollection.doc<T>(id).valueChanges();
  }
  getAll(): Observable<Array<T>> {
    return this.itemsCollection.valueChanges();
  }
  add(value: T): Observable<T> {
    const id = this.firestoreService.createId();
    const newItem: T = {
      ...value,
      id
    };
    return new Observable(observer => {
      try {
        this.itemsCollection.doc(id).set(newItem);
        observer.next(void 0);
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    }).pipe(
      map(() => newItem)
    );
  }
  edit(value: T): Observable<T> {
    return new Observable(observer => {
      try {
        this.itemsCollection.doc(value.id).set(value);
        observer.next(void 0);
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    }).pipe(
      map(() => value)
    );
  }
  remove(value: T): Observable<boolean> {
    return new Observable(observer => {
      try {
        this.itemsCollection.doc(value.id).delete();
        observer.next(void 0);
      } catch (error) {
        observer.error(error);
      }
      observer.complete();
    }).pipe(
      map(() => true)
    );
  }
}
