import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandwichListComponent } from './components/sandwich-list/sandwich-list.component';
import { SandwichDetailComponent } from './components/sandwich-detail/sandwich-detail.component';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';

const routes: Routes = [
  {
    path: 'sandwich',
    component: SandwichListComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'sandwich/new',
    component: SandwichDetailComponent,
    pathMatch: 'full',
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'sandwich/:id',
    component: SandwichDetailComponent,
    canActivate: [AuthenticateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandwichRoutingModule { }
