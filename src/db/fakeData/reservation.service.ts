import { Injectable } from '@angular/core';
import { ReservationService } from 'src/app/sandwich/models/reservation-service';
import { Observable, Observer } from 'rxjs';
import { Reservation } from 'src/app/sandwich/models/reservation';

@Injectable({
  providedIn: 'root'
})
export class FakeReservationService implements ReservationService {

  private reservations: Array<Reservation> = [{
    id: '1',
    sandwichId: '1',
    userId: 'SYSTEM',
    quantity: 1
  }];
  private currentId = 2;

  get(id: string): Observable<Reservation> {
    return new Observable((observer: Observer<Reservation>) => {
      observer.next(this.reservations.find(reservation => reservation.id === id));
      observer.complete();
    });
  }
  getAllForSandwich(sandwichId: string): Observable<Array<Reservation>> {
    return new Observable((observer: Observer<Array<Reservation>>) => {
      observer.next(this.reservations.filter(reservation => reservation.sandwichId === sandwichId));
      observer.complete();
    });
  }
  add(reservation: Reservation): Observable<Reservation> {
    this.currentId = this.currentId + 1;
    const newReservation = {
      ...reservation,
      id: (this.currentId).toString()
    };
    this.reservations.push(newReservation);
    return new Observable((observer: Observer<Reservation>) => {
      observer.next(newReservation);
      observer.complete();
    });
  }
  edit(reservation: Reservation): Observable<Reservation> {
    this.reservations = [
      ...this.reservations.filter(currentReservation => currentReservation.id !== reservation.id),
      reservation
    ];
    return new Observable((observer: Observer<Reservation>) => {
      observer.next(reservation);
      observer.complete();
    });
  }
  remove(reservation: Reservation): Observable<boolean> {
    this.reservations = this.reservations.filter(currentReservation => currentReservation.id !== reservation.id);
    return new Observable((observer: Observer<boolean>) => {
      observer.next(true);
      observer.complete();
    });
  }
}
