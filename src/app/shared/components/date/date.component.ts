import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {

  @Input() date: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() placeholder = 'Choose a date';
  @Input() hint: string;
  @Input() required: boolean;
  @Output() dateChange = new EventEmitter<string>();

  onDateChanged(dateControl: FormControl, event: MatDatepickerInputEvent<Date>) {
    let date: string;
    if (event.value) {
      date = event.value.toISOString().substring(0, 10);
    }
    this.dateChange.emit(date);
    if (this.required) {
      if (date === undefined) {
        dateControl.setErrors({ required: true });
      } else {
        dateControl.setErrors(null);
      }
    }
  }
}
