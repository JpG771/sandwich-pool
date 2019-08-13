import { Component, Inject, Input, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sandwich } from '../../models/sandwich';
import { SandwichFilters } from '../../models/sandwich-filters';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';

@Component({
  selector: 'app-sandwich-items',
  templateUrl: './sandwich-items.component.html',
  styleUrls: ['./sandwich-items.component.scss']
})
export class SandwichItemsComponent {
  @Input() actionTemplate: TemplateRef<any>;
  @Input() additionalInfoTemplate: TemplateRef<any>;
  @Input() additionalFilters: (value: Array<Sandwich>) => Array<Sandwich>;

  userId: string;

  sandwiches$: Observable<Array<Sandwich>>;
  subscriptions$: Subscription = new Subscription();
  filters$ = new BehaviorSubject<SandwichFilters>({
    quantity: 1
  });
  manualRefresh$ = new BehaviorSubject<void>(void 0);

  constructor(
    @Inject(SANDWICH_SERVICE_TOKEN_NAME)
    private sandwichService: SandwichService
  ) {}

  initSandwich() {
    this.sandwiches$ = combineLatest([this.sandwichService.getAll(), this.filters$, this.manualRefresh$]).pipe(
      map(([sandwiches, filters]) =>
        this.additionalFilters(
          sandwiches
            .filter(this.filterByType(filters.type))
            .filter(this.filterByQuantity(filters.quantity))
            .filter(this.filterByMaxPrice(filters.maxPrice))
            .filter(this.filterByMinPrice(filters.minPrice))
            .filter(this.filterByTitle(filters.title))
            .filter(this.filterByTags(filters.tags))
        )
      )
    );
  }

  onFiltering(filters: SandwichFilters): void {
    this.filters$.next(filters);
  }

  refresh(): void {
    this.manualRefresh$.next();
  }

  private filterByType(types?: Array<string>): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => (types ? types.indexOf(sandwich.type) >= 0 : true);
  }

  private filterByTitle(title?: string): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich =>
      title
        ? sandwich.title
            .normalize()
            .toLowerCase()
            .indexOf(title.normalize().toLowerCase()) >= 0
        : true;
  }

  private filterByMaxPrice(maxPrice?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => (maxPrice ? sandwich.price <= maxPrice : true);
  }

  private filterByMinPrice(minPrice?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => (minPrice ? sandwich.price >= minPrice : true);
  }

  private filterByQuantity(quantity?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => (quantity ? sandwich.quantityLeft >= quantity : true);
  }

  /**
   * Make sure that the sandwich contains all the tags by verifying that none are missing in the sandwich.
   * @param tags List of tags that the sandwich need to contains.
   */
  private filterByTags(tags?: Array<string>): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => (tags !== undefined && tags.length > 0 ? tags.find(tag => sandwich.tags.indexOf(tag) < 0) === undefined : true);
  }
}
