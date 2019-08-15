import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from 'src/app/shared/models/address';
import { getCurrentDateTime, toNumber } from 'src/app/shared/utils/date.util';
import { Sandwich } from '../../models/sandwich';
import { SandwichFilter } from '../../models/sandwich-filters';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';
import { calculateDistance } from '../../utils/location.util';

@Component({
  selector: 'app-sandwich-items',
  templateUrl: './sandwich-items.component.html',
  styleUrls: ['./sandwich-items.component.scss']
})
export class SandwichItemsComponent implements OnInit {
  @Input() actionTemplate: TemplateRef<any>;
  @Input() additionalInfoTemplate: TemplateRef<any>;
  @Input() additionalFilters: (value: Array<Sandwich>) => Array<Sandwich>;

  userId: string;

  sandwiches$: Observable<Array<Sandwich>>;
  subscriptions$: Subscription = new Subscription();
  filters$ = new BehaviorSubject<SandwichFilter>({
    quantity: 1
  });
  manualRefresh$ = new BehaviorSubject<void>(void 0);
  currentDate: number;

  constructor(
    @Inject(SANDWICH_SERVICE_TOKEN_NAME)
    private sandwichService: SandwichService
  ) {}

  ngOnInit(): void {
    this.currentDate = toNumber(getCurrentDateTime());
  }

  initSandwich() {
    this.sandwiches$ = combineLatest([this.sandwichService.getAll(), this.filters$, this.manualRefresh$]).pipe(
      map(([sandwiches, filter]) =>
        this.additionalFilters(
          sandwiches
            .filter(this.filterByType(filter.type))
            .filter(this.filterByQuantity(filter.quantity))
            .filter(this.filterByMaxPrice(filter.maxPrice))
            .filter(this.filterByMinPrice(filter.minPrice))
            .filter(this.filterByDateLimit())
            .filter(this.filterByDatePickUp(filter.dateFrom, filter.dateTo))
            .filter(this.filterByTitle(filter.title))
            .filter(this.filterByTags(filter.tags))
            .filter(this.filterByDistance(filter.address, filter.distance))
        )
      )
    );
  }

  onFiltering(filters: SandwichFilter): void {
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

  private filterByDatePickUp(dateFrom?: number, dateTo?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => {
      if (sandwich.datePickUp) {
        const datePickup = toNumber(sandwich.datePickUp);
        const dateFromConditionResult = dateFrom ? datePickup >= dateFrom : true;
        const dateToConditionResult = dateTo ? datePickup <= dateTo : true;
        return dateFromConditionResult && dateToConditionResult;
      }
      return true;
    };
  }
  private filterByDateLimit(): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => sandwich.dateLimit ? toNumber(sandwich.dateLimit) > this.currentDate : true;
  }

  private filterByDistance(targetAddress: Address, distance: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => targetAddress.latitude !== undefined ? calculateDistance(
      targetAddress.latitude,
      targetAddress.longitude,
      sandwich.address.latitude,
      sandwich.address.longitude
    ) <= distance : true;
  }
}
