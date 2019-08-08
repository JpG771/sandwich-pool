import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable, Subscription } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { USER_SERVICE_TOKEN_NAME, UserService } from 'src/app/core/models/user-service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Reservation } from '../../models/reservation';
import { RESERVATION_SERVICE_TOKEN_NAME, ReservationService } from '../../models/reservation-service';
import { Sandwich } from '../../models/sandwich';
import { SandwichFilters } from '../../models/sandwich-filters';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';

@Component({
  selector: 'app-sandwich-list',
  templateUrl: './sandwich-list.component.html',
  styleUrls: ['./sandwich-list.component.scss']
})
export class SandwichListComponent implements OnInit, OnDestroy {

  userId: string;
  reservations: Array<Reservation>;

  sandwiches$: Observable<Array<Sandwich>>;
  subscriptions$: Subscription = new Subscription();
  filters$ = new BehaviorSubject<SandwichFilters>({
    quantity: 1,
    showMine: false,
    showReserved: false
  });
  manualRefresh$ = new BehaviorSubject<void>(void 0);

  constructor(
    @Inject(USER_SERVICE_TOKEN_NAME) private userService: UserService,
    @Inject(SANDWICH_SERVICE_TOKEN_NAME) private sandwichService: SandwichService,
    @Inject(RESERVATION_SERVICE_TOKEN_NAME) private reservationService: ReservationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.subscriptions$.add(
      this.userService.getUserId()
        .pipe(
          switchMap(userId => {
            this.userId = userId;
            return this.reservationService.getAllForUser(userId).pipe(
              take(1),
              catchError(error => {
                this.alertService.showError('Could not fetch reservations. Sandwiches already reserved could be shown.');
                return from([[] as Array<Reservation>]);
              })
            );
          })
        ).subscribe(reservations => {
          this.reservations = reservations;

          this.sandwiches$ =
          combineLatest(
            this.sandwichService.getAll(),
            this.filters$,
            this.manualRefresh$
          ).pipe(
            map(([sandwiches, filters]) => sandwiches
              .filter(this.filterByUserId(filters.userId))
              .filter(this.filterByType(filters.type))
              .filter(this.filterByQuantity(filters.quantity))
              .filter(this.filterByMaxPrice(filters.maxPrice))
              .filter(this.filterByMinPrice(filters.minPrice))
              .filter(this.filterByTitle(filters.title))
              .filter(this.filterByShowMine(filters.showMine, this.userId))
              .filter(this.filterByShowReserved(filters.showReserved, this.reservations))
              .filter(this.filterByTags(filters.tags))
            )
          );
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  onFiltering(filters: SandwichFilters): void {
    this.filters$.next(filters);
  }

  onReserve(sandwich: Sandwich): void {
    const newReservation: Reservation = {
      sandwichId: sandwich.id,
      userId: this.userId,
      quantity: 1
    };
    this.reservationService.add(newReservation).subscribe(result => {
      this.reservations.push(result);
      this.manualRefresh$.next();
      this.alertService.showSuccess('Reservation completed!');
    }, error => {
      this.alertService.showError('Could not complete reservation, please try again later.');
    });
  }

  private filterByUserId(userId?: string): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => userId ? sandwich.userId === userId : true;
  }

  private filterByType(types?: Array<string>): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => types ? types.indexOf(sandwich.type) >= 0 : true;
  }

  private filterByTitle(title?: string): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => title ? sandwich.title.normalize().toLowerCase().indexOf(title.normalize().toLowerCase()) >= 0 : true;
  }

  private filterByMaxPrice(maxPrice?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => maxPrice ? sandwich.price <= maxPrice : true;
  }

  private filterByMinPrice(minPrice?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => minPrice ? sandwich.price >= minPrice : true;
  }

  private filterByQuantity(quantity?: number): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => quantity ? sandwich.quantity >= quantity : true;
  }

  private filterByShowMine(showMine: boolean, userId: string): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => showMine ? true : sandwich.userId !== userId;
  }

  /**
   * Make sure that the sandwich is not part of the reserved list.
   * @param showReserved Should we show already reserved sandwich.
   * @param reservations List of current reservations.
   */
  private filterByShowReserved(showReserved: boolean, reservations: Array<Reservation>):
    (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => showReserved
      ? true
      : reservations.find(reservation => reservation.sandwichId === sandwich.id) === undefined;
  }

  /**
   * Make sure that the sandwich contains all the tags by verifying that none are missing in the sandwich.
   * @param tags List of tags that the sandwich need to contains.
   */
  private filterByTags(tags?: Array<string>): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => tags !== undefined && tags.length > 0
      ? tags.find(tag => sandwich.tags.indexOf(tag) < 0) === undefined
      : true;
  }
}
