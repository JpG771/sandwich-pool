import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { USER_SERVICE_TOKEN_NAME, UserService } from 'src/app/core/models/user-service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { RESERVATION_SERVICE_TOKEN_NAME, ReservationService } from '../../models/reservation-service';
import { Sandwich } from '../../models/sandwich';
import { SandwichFilters } from '../../models/sandwich-filters';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';
import { SandwichItemsComponent } from '../sandwich-items/sandwich-items.component';

@Component({
  selector: 'app-my-sandwich',
  templateUrl: './my-sandwich.component.html',
  styleUrls: ['./my-sandwich.component.scss']
})
export class MySandwichComponent implements OnInit {

  @ViewChild('items', { static: true }) itemsComponent: SandwichItemsComponent;

  constructor(
    @Inject(USER_SERVICE_TOKEN_NAME) private userService: UserService,
    @Inject(RESERVATION_SERVICE_TOKEN_NAME) private reservationService: ReservationService,
    @Inject(SANDWICH_SERVICE_TOKEN_NAME) private sandwichService: SandwichService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.itemsComponent.userId = userId;
      this.itemsComponent.additionalFilters = (sandwiches: Array<Sandwich>) => sandwiches
        .filter(sandwich => sandwich.userId === this.itemsComponent.userId);
      this.itemsComponent.initSandwich();
    });
  }

  onFiltering(sandwichFilters: SandwichFilters): void {
    this.itemsComponent.onFiltering(sandwichFilters);
  }

  onDelete(sandwich: Sandwich): void {
    this.sandwichService.remove(sandwich).subscribe(result => {
      this.alertService.showSuccess('The sandwich was removed.');
    }, error => {
      this.alertService.showError('Could not delete the sandwich. Please try again later.');
    });
  }
}
