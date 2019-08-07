import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Sandwich } from 'src/app/sandwich/models/sandwich';
import { SandwichService } from 'src/app/sandwich/models/sandwich-service';

@Injectable({
  providedIn: 'root'
})
export class FakeSandwichService implements SandwichService {

  private sandwiches: Array<Sandwich> = [{
    id: '1',
    userId: 'SYSTEM',
    title: 'Sandwich 1',
    description: '',
    price: 10,
    quantity: 1,
    type: 'Sandwich',
    tags: ['Sandwich']
  }];
  private newId = 2;

  get(id: string): Observable<Sandwich> {
    return new Observable((observer: Observer<Sandwich>) => {
      observer.next(this.sandwiches.find(sandwich => sandwich.id === id));
      observer.complete();
    });
  }
  getAll(): Observable<Array<Sandwich>> {
    return new Observable((observer: Observer<Array<Sandwich>>) => {
      observer.next(this.sandwiches);
      observer.complete();
    });
  }
  add(sandwich: Sandwich): Observable<Sandwich> {
    this.newId = this.newId + 1;
    const newSandwich: Sandwich = {
      ...sandwich,
      id: (this.newId).toString()
    };
    this.sandwiches.push(newSandwich);
    return new Observable((observer: Observer<Sandwich>) => {
      observer.next(newSandwich);
      observer.complete();
    });
  }
  edit(sandwich: Sandwich): Observable<Sandwich> {
    this.sandwiches = [
      ...this.sandwiches.filter(currentSandwich => currentSandwich.id !== sandwich.id),
      sandwich
    ];
    return new Observable((observer: Observer<Sandwich>) => {
      observer.next(sandwich);
      observer.complete();
    });
  }
  remove(sandwich: Sandwich): Observable<boolean> {
    this.sandwiches = this.sandwiches.filter(currentSandwich => currentSandwich.id !== sandwich.id);
    return new Observable((observer: Observer<boolean>) => {
      observer.next(true);
      observer.complete();
    });
  }
}
