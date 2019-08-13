import { Observable } from 'rxjs';
import { Sandwich } from './sandwich';

export const SANDWICH_SERVICE_TOKEN_NAME = 'SandwichService';

export interface SandwichService {
  get(id: string): Observable<Sandwich>;
  getAll(): Observable<Array<Sandwich>>;

  add(sandwich: Sandwich): Observable<Sandwich>;
  edit(sandwich: Sandwich): Observable<Sandwich>;
  remove(sandwich: Sandwich): Observable<boolean>;
}
