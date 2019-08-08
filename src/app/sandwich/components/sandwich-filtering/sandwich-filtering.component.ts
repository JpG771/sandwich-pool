import { Component, ContentChild, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SandwichFilters } from '../../models/sandwich-filters';

@Component({
  selector: 'app-sandwich-filtering',
  templateUrl: './sandwich-filtering.component.html',
  styleUrls: ['./sandwich-filtering.component.scss']
})
export class SandwichFilteringComponent implements OnInit, OnDestroy {

  @ContentChild(TemplateRef, { static: false }) additionalFiltersTemplate: TemplateRef<any>;

  @Output() sandwichFiltersChange: EventEmitter<SandwichFilters> = new EventEmitter();

  sandwichFilters: SandwichFilters;
  maxPriceChanged$: Subject<number> = new Subject();
  minPriceChanged$: Subject<number> = new Subject();

  ngOnInit() {
    this.sandwichFilters = this.getDefaultFilters();
    this.sandwichFiltersChange.emit(this.sandwichFilters);
    this.maxPriceChanged$.pipe(
      debounceTime(300)
    ).subscribe(value => this.sandwichFilters.maxPrice = value);
    this.minPriceChanged$.pipe(
      debounceTime(300)
    ).subscribe(value => this.sandwichFilters.minPrice = value);
  }
  ngOnDestroy(): void {
    this.maxPriceChanged$.unsubscribe();
    this.minPriceChanged$.unsubscribe();
  }

  onSubmit(): void {
    this.sandwichFiltersChange.emit(this.sandwichFilters);
  }

  onMinPriceChanged(change: MatSliderChange): void {
    this.minPriceChanged$.next(change.value);
  }

  onMaxPriceChanged(change: MatSliderChange): void {
    this.maxPriceChanged$.next(change.value);
  }

  private getDefaultFilters = (): SandwichFilters => ({
    quantity: 1
  })
}
