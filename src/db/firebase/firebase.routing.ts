import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirebaseLoginComponent } from './components/firebase-login/firebase-login.component';
import { FirebaseAvatarComponent } from './components/firebase-avatar/firebase-avatar.component';

const routes: Routes = [
  {
    path: 'login',
    component: FirebaseLoginComponent
  },
  {
    path: '',
    component: FirebaseAvatarComponent,
    outlet: 'avatar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirebaseRoutingModule { }
