import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandwichModule } from './sandwich/sandwich.module';
import { AboutComponent } from './core/components/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
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
