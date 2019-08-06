import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirebaseLoginComponent } from './components/firebase-login/firebase-login.component';
import { NgxAuthFirebaseuiAvatarComponent } from 'ngx-auth-firebaseui';

const routes: Routes = [
  {
    path: 'login',
    component: FirebaseLoginComponent
  },
  {
    path: '',
    component: NgxAuthFirebaseuiAvatarComponent,
    outlet: 'avatar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirebaseRoutingModule { }
