import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';
import { SandwichDetailComponent } from './components/sandwich-detail/sandwich-detail.component';
import { SandwichListComponent } from './components/sandwich-list/sandwich-list.component';

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
