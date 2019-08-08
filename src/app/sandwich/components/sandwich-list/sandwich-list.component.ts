import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { USER_SERVICE_TOKEN_NAME, UserService } from 'src/app/core/models/user-service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Reservation } from '../../models/reservation';
import { RESERVATION_SERVICE_TOKEN_NAME, ReservationService } from '../../models/reservation-service';
import { Sandwich } from '../../models/sandwich';
import { SandwichFilters } from '../../models/sandwich-filters';
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

  @ViewChild('items', { static: true }) itemsComponent: SandwichItemsComponent;

  constructor(
    @Inject(USER_SERVICE_TOKEN_NAME) private userService: UserService,
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
          .filter(this.filterByUserId(this.filterUserId));
        this.itemsComponent.initSandwich();
      });
    });
  }

  onFiltering(sandwichFilters: SandwichFilters): void {
    this.itemsComponent.onFiltering(sandwichFilters);
  }
  onReserve(sandwich: Sandwich): void {
    const newReservation: Reservation = {
      sandwichId: sandwich.id,
      userId: this.itemsComponent.userId,
      quantity: 1
    };
    this.reservationService.add(newReservation).subscribe(result => {
      this.reservations.push(result);
      this.itemsComponent.refresh();
      this.alertService.showSuccess('Reservation completed!');
    }, error => {
      this.alertService.showError('Could not complete reservation, please try again later.');
    });
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
