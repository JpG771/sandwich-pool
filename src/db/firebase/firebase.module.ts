import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatButtonModule } from '@angular/material/button';
import { GestureConfig } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { FirebaseAvatarComponent } from './components/firebase-avatar/firebase-avatar.component';
import { FirebaseLoginComponent } from './components/firebase-login/firebase-login.component';
import { firebaseConfig } from './firebase.config';
import { FirebaseRoutingModule } from './firebase.routing';

export function appName() {
  return 'Sandwich Pooling';
}

@NgModule({
  declarations: [
    FirebaseLoginComponent,
    FirebaseAvatarComponent
  ],
  imports: [
    NgxAuthFirebaseUIModule.forRoot(firebaseConfig, appName, {
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
