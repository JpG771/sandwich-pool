import { Observable } from 'rxjs';

export const USER_SERVICE_TOKEN_NAME = 'UserService';

export interface UserService {
  isLoggedIn(): Observable<boolean>;

  getUserId(): Observable<string>;
  getUserName(): Observable<string>;
  getUserEmail(): Observable<string>;
}
