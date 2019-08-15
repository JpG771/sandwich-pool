import { Component, ContentChild, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { toNumber } from 'src/app/shared/utils/date.util';
import { SandwichFilter } from '../../models/sandwich-filters';

@Component({
  selector: 'app-sandwich-filtering',
  templateUrl: './sandwich-filtering.component.html',
  styleUrls: ['./sandwich-filtering.component.scss']
})
export class SandwichFilteringComponent implements OnInit, OnDestroy {

  @ContentChild(TemplateRef, { static: false }) additionalFiltersTemplate: TemplateRef<any>;

  @Output() sandwichFiltersChange: EventEmitter<SandwichFilter> = new EventEmitter();
  @Output() closing: EventEmitter<void> = new EventEmitter();

  sandwichFilters: SandwichFilter;
  sliderChanged$: Subject<{ key: string, value: number }> = new Subject();

  dateFrom: string;
  dateTo: string;

  ngOnInit() {
    this.sandwichFilters = this.getDefaultFilters();
    this.sandwichFiltersChange.emit(this.sandwichFilters);
    this.sliderChanged$.pipe(
      throttleTime(300)
    ).subscribe(value => this.sandwichFilters[value.key] = value.value);
  }
  ngOnDestroy(): void {
    this.sliderChanged$.unsubscribe();
  }

  onSubmit(): void {
    // Change date filters to number
    this.sandwichFilters.dateFrom = toNumber(this.dateFrom);
    this.sandwichFilters.dateTo = toNumber(this.dateTo);
    // Send the changes
    this.sandwichFiltersChange.emit(this.sandwichFilters);
  }

  onSliderChanged(key: string, change: MatSliderChange): void {
    this.sliderChanged$.next({ key, value: change.value });
  }

  onClose(): void {
    this.closing.emit();
  }

  onDateFromChanged(fromDate: string) {
    this.dateTo = fromDate;
  }

  private getDefaultFilters = (): SandwichFilter => ({
    quantity: 1,
    distance: 10,
    address: {
      name: undefined,
      longitude: undefined,
      latitude: undefined
     }
  })
}
