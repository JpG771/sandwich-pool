import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/components/about/about.component';
import { PrivacyPolicyComponent } from './core/components/privacy-policy/privacy-policy.component';
import { TosComponent } from './core/components/tos/tos.component';
import { SandwichModule } from './sandwich/sandwich.module';

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
