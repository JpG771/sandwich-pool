import { firebaseConfig } from './firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { FirebaseRoutingModule } from './firebase.routing';
import { FirebaseLoginComponent } from './components/firebase-login/firebase-login.component';

@NgModule({
  declarations: [
    FirebaseLoginComponent
  ],
  imports: [
    NgxAuthFirebaseUIModule.forRoot(firebaseConfig, () => 'Sandwich Pooling'),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    FirebaseRoutingModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
  ]
})
export class FirebaseModule { }