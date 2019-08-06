import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandwichListComponent } from './components/sandwich-list/sandwich-list.component';
import { SandwichDetailComponent } from './components/sandwich-detail/sandwich-detail.component';

const routes: Routes = [
  {
    path: 'sandwich',
    component: SandwichListComponent
  },
  {
    path: 'sandwich/new',
    component: SandwichDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'sandwich/:id',
    component: SandwichDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandwichRoutingModule { }
