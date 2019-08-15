import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateModule } from '../date/date.module';
import { DateTimeComponent } from './date-time.component';

@NgModule({
  declarations: [ DateTimeComponent ],
  imports: [
    CommonModule,
    DateModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [ DateTimeComponent ],
  providers: []
})
export class DateTimeModule { }
