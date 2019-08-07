import { UserService } from 'src/app/core/models/user-service';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeUserService implements UserService {
  isLoggedIn(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      observer.next(true);
      observer.complete();
    });
  }
  getUserName(): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      observer.next('Bob');
      observer.complete();
    });
  }
  getUserEmail(): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      observer.next('bob@mail.com');
      observer.complete();
    });
  }
}
