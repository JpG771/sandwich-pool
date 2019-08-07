import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserService } from 'src/app/core/models/user-service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticateService implements UserService {

  constructor(private authService: AngularFireAuth) {
    this.authService.auth.useDeviceLanguage();
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.user.pipe(
      map(user => user !== null && user !== undefined)
    );
  }

  getUserId(): Observable<string> {
    return this.authService.user.pipe(
      filter(user => user !== null && user !== undefined),
      map(user => user.uid)
    );
  }
  getUserName(): Observable<string> {
    return this.authService.user.pipe(
      filter(user => user !== null && user !== undefined),
      map(user => user.displayName)
    );
  }
  getUserEmail(): Observable<string> {
    return this.authService.user.pipe(
      filter(user => user !== null && user !== undefined),
      map(user => user.email)
    );
  }
}
