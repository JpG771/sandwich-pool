import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseAvatarComponent } from './components/firebase-avatar/firebase-avatar.component';
import { FirebaseLoginComponent } from './components/firebase-login/firebase-login.component';

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
