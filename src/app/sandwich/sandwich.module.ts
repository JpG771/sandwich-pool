import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandwichListComponent } from './components/sandwich-list/sandwich-list.component';
import { SandwichDetailComponent } from './components/sandwich-detail/sandwich-detail.component';
import { SandwichRoutingModule } from './sandwich.routing';
import { SANDWICH_SERVICE_TOKEN_NAME } from './models/sandwich-service';
import { RESERVATION_SERVICE_TOKEN_NAME } from './models/reservation-service';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [SandwichListComponent, SandwichDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    SandwichRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
  ],
  providers: [
    { provide: SANDWICH_SERVICE_TOKEN_NAME, useClass: environment.sandwichService },
    { provide: RESERVATION_SERVICE_TOKEN_NAME, useClass: environment.reservationService },
  ]
})
export class SandwichModule { }
