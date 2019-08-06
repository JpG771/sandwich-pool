import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.scss']
})
export class FirebaseLoginComponent implements OnInit {

  providers = [
    AuthProvider.Google,
    AuthProvider.Facebook,
    AuthProvider.EmailAndPassword
  ];
  
  constructor() {
    
   }

  ngOnInit() {
  }

}
