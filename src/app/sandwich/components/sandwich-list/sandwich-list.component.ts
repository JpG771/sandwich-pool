import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { USER_SERVICE_TOKEN_NAME, UserService } from 'src/app/core/models/user-service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { Reservation } from '../../models/reservation';
import { RESERVATION_SERVICE_TOKEN_NAME, ReservationService } from '../../models/reservation-service';
import { Sandwich } from '../../models/sandwich';
import { SandwichFilter } from '../../models/sandwich-filters';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';
import { sortSandwichByDate } from '../../utils/sandwich.util';
import { SandwichItemsComponent } from '../sandwich-items/sandwich-items.component';

@Component({
  selector: 'app-sandwich-list',
  templateUrl: './sandwich-list.component.html',
  styleUrls: ['./sandwich-list.component.scss']
})
export class SandwichListComponent implements OnInit {

  showReserved = false;
  showMine = false;
  filterUserId: string;

  reservations: Array<Reservation>;
  quantityToReserve: number[] = [];

  @ViewChild('items', { static: true }) itemsComponent: SandwichItemsComponent;

  constructor(
    @Inject(USER_SERVICE_TOKEN_NAME) private userService: UserService,
    @Inject(SANDWICH_SERVICE_TOKEN_NAME) private sandwichService: SandwichService,
    @Inject(RESERVATION_SERVICE_TOKEN_NAME) private reservationService: ReservationService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.itemsComponent.userId = userId;
      this.reservationService.getAllForUser(userId).pipe(
        take(1),
        catchError(error => {
          this.alertService.showError('Could not fetch reservations. Sandwiches already reserved could be shown.');
          return from([[] as Array<Reservation>]);
        })
      ).subscribe(reservations => {
        this.reservations = reservations;
        this.itemsComponent.additionalFilters = (sandwiches: Array<Sandwich>) => sandwiches
          .filter(this.filterByShowMine(this.showMine, this.itemsComponent.userId))
          .filter(this.filterByShowReserved(this.showReserved, this.reservations))
          .filter(this.filterByUserId(this.filterUserId))
          .sort(sortSandwichByDate());
        this.itemsComponent.initSandwich();
      });
    });
  }

  onFiltering(sandwichFilters: SandwichFilter): void {
    this.itemsComponent.onFiltering(sandwichFilters);
    this.quantityToReserve = [];
  }
  onReserve(sandwich: Sandwich, index: number): void {
    const quantityToReserve = this.quantityToReserve[index] || 1;
    const newReservation: Reservation = {
      sandwichId: sandwich.id,
      userId: this.itemsComponent.userId,
      quantity: quantityToReserve
    };
    sandwich.quantityLeft -= quantityToReserve;
    this.reservationService.add(newReservation).subscribe(reservationResult => {
      this.sandwichService.edit(sandwich).subscribe(sandwichResult => {
        this.reservations.push(reservationResult);
        this.itemsComponent.refresh();
        this.alertService.showSuccess('Reservation completed!');
      }, error => {
        this.alertService.showError('Could not complete while saving the sandwich, please try again later.');
      });
    }, error => {
      this.alertService.showError('Could not complete reservation, please try again later.');
      sandwich.quantityLeft += quantityToReserve;
    });
  }

  getSandwichPrice(sandwich: Sandwich, index: number) {
    return sandwich.price * (this.quantityToReserve[index] || 1)
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
    return sandwich => showReserved || !reservations
      ? true
      : reservations.find(reservation => reservation.sandwichId === sandwich.id) === undefined;
  }

  private filterByUserId(userId: string): (value: Sandwich, index: number, array: Array<Sandwich>) => boolean {
    return sandwich => userId ? sandwich.userId === userId : true;
  }
}
