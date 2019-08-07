import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandwichModule } from './sandwich/sandwich.module';
import { AboutComponent } from './core/components/about/about.component';
import { TosComponent } from './core/components/tos/tos.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'tos',
    component: TosComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SandwichModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
