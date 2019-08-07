import { Component } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.scss']
})
export class FirebaseLoginComponent {

  providers = [
    AuthProvider.Google,
    AuthProvider.Facebook,
    AuthProvider.EmailAndPassword
  ];

  constructor(private router: Router) {}

  onLoginSuccess() {
    this.router.navigate(['sandwich']);
  }

}
