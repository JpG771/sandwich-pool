import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { environment } from 'src/environments/environment';
import { AddressAutocompleteModule } from '../shared/address-autocomplete/address-autocomplete.module';
import { AlertModule } from '../shared/alert/alert.module';
import { MySandwichComponent } from './components/my-sandwich/my-sandwich.component';
import { SandwichDetailComponent } from './components/sandwich-detail/sandwich-detail.component';
import { SandwichFilteringComponent } from './components/sandwich-filtering/sandwich-filtering.component';
import { SandwichItemsComponent } from './components/sandwich-items/sandwich-items.component';
import { SandwichListComponent } from './components/sandwich-list/sandwich-list.component';
import { RESERVATION_SERVICE_TOKEN_NAME } from './models/reservation-service';
import { SANDWICH_SERVICE_TOKEN_NAME } from './models/sandwich-service';
import { SandwichRoutingModule } from './sandwich.routing';

@NgModule({
  declarations: [SandwichListComponent, SandwichDetailComponent, SandwichFilteringComponent, MySandwichComponent, SandwichItemsComponent],
  imports: [
    AddressAutocompleteModule,
    AlertModule,
    CommonModule,
    FormsModule,
    SandwichRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
  ],
  providers: [
    { provide: SANDWICH_SERVICE_TOKEN_NAME, useClass: environment.services.sandwichService },
    { provide: RESERVATION_SERVICE_TOKEN_NAME, useClass: environment.services.reservationService },
  ]
})
export class SandwichModule { }
