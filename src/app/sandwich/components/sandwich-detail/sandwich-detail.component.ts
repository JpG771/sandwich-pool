import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/core/models/user-service';
import { SANDWICH_ID_PARAM_KEY } from '../../constants/sandwich';
import { Sandwich } from '../../models/sandwich';
import { SANDWICH_SERVICE_TOKEN_NAME, SandwichService } from '../../models/sandwich-service';

@Component({
  selector: 'app-sandwich-detail',
  templateUrl: './sandwich-detail.component.html',
  styleUrls: ['./sandwich-detail.component.scss']
})
export class SandwichDetailComponent implements OnInit, OnDestroy {

  currentSandwich: Sandwich;
  routeSubscription$: Subscription;
  priceChanged$: Subject<number> = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    @Inject(SANDWICH_SERVICE_TOKEN_NAME) private sandwichService: SandwichService
  ) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.routeSubscription$ = this.route.params.subscribe(params => {
        const sandwichId: string = params[SANDWICH_ID_PARAM_KEY];
        if (sandwichId) {
          this.sandwichService.get(sandwichId).subscribe(sandwich => {
            this.currentSandwich = sandwich ? sandwich : this.getDefaultSandwich(userId);
          }, error => {
            console.error('Error loading sandwich : ', error);
          });
        } else {
          this.currentSandwich = this.getDefaultSandwich(userId);
        }
      });
    });
    this.priceChanged$.pipe(
      debounceTime(500)
    ).subscribe(newValue => {
      this.currentSandwich.price = newValue;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription$) {
      this.routeSubscription$.unsubscribe();
    }
    if (this.priceChanged$) {
      this.priceChanged$.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.currentSandwich.id) {
      this.sandwichService.edit(this.currentSandwich).subscribe(result => {
        this.currentSandwich = result;
        console.log('Success');
      }, error => {
        console.error('Couldn\'t save the sandwich : ', error);
      });
    } else {
      this.sandwichService.add(this.currentSandwich).subscribe(result => {
        this.currentSandwich = result;
        console.log('Success');
        this.router.navigate(['sandwich']);
      }, error => {
        console.error('Couldn\'t save the sandwich : ', error);
      });
    }
  }

  onSliderChanged(newValue: number): void {
    this.priceChanged$.next(newValue);
  }

  private getDefaultSandwich = (userId: string): Sandwich => ({
    title: '',
    userId,
    price: 0,
    quantity: 1,
    type: 'Sandwich'
  })
}
