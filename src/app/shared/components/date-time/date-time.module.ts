import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  NativeDateAdapter
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateTimeComponent } from './date-time.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'month',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class MyDateAdapter extends NativeDateAdapter {
  // tslint:disable-next-line: ban-types
  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'YYYY-MM-DD') {

        const day = (date.getDate() + 1).toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    } else if (displayFormat === 'month') {
      return date.toLocaleDateString(undefined, { month: 'long' });
    }

    return date.toDateString();
  }
}

@NgModule({
  declarations: [ DateTimeComponent ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [ DateTimeComponent ],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DateTimeModule { }
