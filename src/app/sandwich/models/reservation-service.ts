import { Observable } from 'rxjs';
import { Reservation } from './reservation';

export const RESERVATION_SERVICE_TOKEN_NAME = 'ReservationService';

export interface ReservationService {
  get(id: string): Observable<Reservation>;
  getAllForSandwich(sandwichId: string): Observable<Array<Reservation>>;
  getAllForUser(userId: string): Observable<Array<Reservation>>;

  add(reservation: Reservation): Observable<Reservation>;
  edit(reservation: Reservation): Observable<Reservation>;
  remove(reservation: Reservation): Observable<boolean>;
}
