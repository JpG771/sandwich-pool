import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SandwichFilters } from '../../models/sandwich-filters';

@Component({
  selector: 'app-sandwich-filtering',
  templateUrl: './sandwich-filtering.component.html',
  styleUrls: ['./sandwich-filtering.component.scss']
})
export class SandwichFilteringComponent implements OnInit {

  @Output() sandwichFiltersChange: EventEmitter<SandwichFilters> = new EventEmitter();

  sandwichFilters: SandwichFilters;

  ngOnInit() {
    this.sandwichFilters = this.getDefaultFilters();
    this.sandwichFiltersChange.emit(this.sandwichFilters);
  }

  onSubmit(): void {
    this.sandwichFiltersChange.emit(this.sandwichFilters);
  }

  private getDefaultFilters = (): SandwichFilters => ({
    quantity: 1,
    showReserved: false,
    showMine: false
  })
}
