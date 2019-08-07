import { firebaseConfig } from './firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, MatButtonModule } from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { FirebaseRoutingModule } from './firebase.routing';
import { FirebaseLoginComponent } from './components/firebase-login/firebase-login.component';
import { FirebaseAvatarComponent } from './components/firebase-avatar/firebase-avatar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FirebaseLoginComponent,
    FirebaseAvatarComponent
  ],
  imports: [
    NgxAuthFirebaseUIModule.forRoot(firebaseConfig, () => 'Sandwich Pooling', {
      authGuardFallbackURL: '/',
      authGuardLoggedInURL: '/',
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    FirebaseRoutingModule,

    CommonModule,
    MatButtonModule,
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
  ]
})
export class FirebaseModule { }