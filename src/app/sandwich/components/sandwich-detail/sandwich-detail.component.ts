import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { USER_SERVICE_TOKEN_NAME, UserService } from 'src/app/core/models/user-service';
import { AlertService } from 'src/app/shared/alert/alert.service';
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

  // Variable to load image preview
  imageSource: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    @Inject(USER_SERVICE_TOKEN_NAME) private userService: UserService,
    @Inject(SANDWICH_SERVICE_TOKEN_NAME) private sandwichService: SandwichService
  ) { }

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.routeSubscription$ = this.route.params.subscribe(params => {
        const sandwichId: string = params[SANDWICH_ID_PARAM_KEY];
        this.initSandwich(sandwichId, userId);
      });
    });
    this.priceChanged$.pipe(
      throttleTime(300)
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
    // Update quantity
    this.currentSandwich.quantityLeft = this.currentSandwich.quantity;
    // Insert or update the sandwich
    if (this.currentSandwich.id) {
      this.sandwichService.edit(this.currentSandwich).subscribe(result => {
        this.currentSandwich = result;
        this.alertService.showSuccess('Sandwich was saved!');
      }, error => {
        this.alertService.showError('Couldn\'t save the sandwich. Please try again later.');
        console.error('Couldn\'t save the sandwich : ', error);
      });
    } else {
      this.sandwichService.add(this.currentSandwich).subscribe(result => {
        this.currentSandwich = result;
        this.alertService.showSuccess('Sandwich was saved!');
        this.router.navigate(['my-sandwich']);
      }, error => {
        this.alertService.showError('Couldn\'t save the sandwich. Please try again later.');
        console.error('Couldn\'t save the sandwich : ', error);
      });
    }
  }

  onSliderChanged(newValue: MatSliderChange): void {
    this.priceChanged$.next(newValue.value);
  }

  onImageChange(imageControl?: FormControl): void {
    const imageUrl = this.currentSandwich.thumbnail;
    if (imageUrl) {
      if (imageControl) {
        imageControl.setErrors({ imageLoading: true });
      }
      fetch(imageUrl)
        .then(response => {
          if (response.status !== 200) {
            if (imageControl) {
              imageControl.setErrors({ loadingError: true });
            }
            return;
          }

          const responseType = response.headers.get('content-type');
          switch (responseType) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/bmp':
            case 'image/svg+xml':
              this.imageSource = imageUrl;
              if (imageControl) {
                imageControl.setErrors(null);
              }
              break;
            default:
              if (imageControl) {
                imageControl.setErrors({ invalidImage: true });
              }
          }
        })
        .catch(() => {
          if (imageControl) {
            imageControl.setErrors({ loadingError: true });
          }
        });
    } else {
      if (imageControl) {
        imageControl.setErrors(null);
      }
    }
  }

  addressIsValid = (): boolean => !!this.currentSandwich.address.name
    && !!this.currentSandwich.address.longitude
    && !!this.currentSandwich.address.latitude

  private initSandwich(sandwichId: string, userId: string) {
    if (sandwichId) {
      this.sandwichService.get(sandwichId).subscribe(sandwich => {
        this.currentSandwich = sandwich ? sandwich : this.getDefaultSandwich(userId);
        this.onImageChange();
      }, error => {
        this.alertService.showError('Error loading sandwich');
        console.error('Error loading sandwich : ', error);
      });
    } else {
      this.currentSandwich = this.getDefaultSandwich(userId);
    }
  }

  private getDefaultSandwich = (userId: string): Sandwich => ({
    title: '',
    userId,
    price: 0,
    quantity: 1,
    type: 'Sandwich',
    address: { name: '', longitude: undefined, latitude: undefined }
  })
}
