import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Address } from '../../models/address';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, OnDestroy {

  @Input() address: Address;
  @Input() hint: string;
  @Input() required = false;

  @Output() addressChange = new EventEmitter<Address>();

  @ViewChild('address', { static: false }) public addressElementRef: ElementRef;

  addressSuggestions: Array<any> = [];
  loading = false;

  private autocompleteService: google.maps.places.AutocompleteService;
  private geoCoder: google.maps.Geocoder;
  private sessionToken: google.maps.places.AutocompleteSessionToken;
  private previousAutocompleteAddress: string;
  private autocompleteChanged$ = new Subject<void>();

  constructor(
    private alertService: AlertService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.geoCoder = new google.maps.Geocoder();
      this.setSessionToken();

      this.autocompleteChanged$.pipe(
        debounceTime(500),
        filter(() => this.address.name !== this.previousAutocompleteAddress)
      ).subscribe(() => {
        this.previousAutocompleteAddress = this.address.name;
        // Generate options
        if (this.address.name) {
          this.loading = true;
          this.autocompleteService.getPlacePredictions({
            input: this.address.name,
            types: ['address'],
            componentRestrictions: { country: 'ca' },
            sessionToken: this.sessionToken
          }, (suggestions, status) => {
            this.loading = false;
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              this.addressSuggestions = suggestions;
            } else {
              this.alertService.showError('Google Places failed to retrieve address list.' +
                ' Please try again later.');
              console.error('Google Places failed due to: ' + status);
            }
          });
        }
      });
    });
  }
  ngOnDestroy(): void {
    if (this.autocompleteChanged$) {
      this.autocompleteChanged$.unsubscribe();
    }
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.address.latitude = position.coords.latitude;
        this.address.longitude = position.coords.longitude;
        this.getAddressName(this.address.latitude, this.address.longitude);
      });
    }
  }

  onKeyUp() {
    this.autocompleteChanged$.next();
  }

  setGeoLocation(place: google.maps.places.QueryAutocompletePrediction) {
    this.address.longitude = undefined;
    this.address.latitude = undefined;
    this.loading = true;

    this.geoCoder.geocode({ placeId: place.place_id }, (results, status) => {
      this.loading = false;
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.address.longitude = results[0].geometry.location.lng();
          this.address.latitude = results[0].geometry.location.lat();
          this.addressChange.emit(this.address);
        } else {
          this.alertService.showError('No longitude/latitude found for that address.' +
            ' Please try again later.');
        }
      } else {
        this.alertService.showError('Google Geocoder failed to retrieve the longitude and latitude for that address.' +
          ' Please try again later.');
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }

  private setSessionToken() {
    const storedSessionToken = sessionStorage.getItem('mapToken');
    if (storedSessionToken) {
      const sessionTokenObject = JSON.parse(storedSessionToken);
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
      this.sessionToken = Object.assign(this.sessionToken, sessionTokenObject);
    } else {
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
      sessionStorage.setItem('mapToken', JSON.stringify(this.sessionToken));
    }
  }

  private getAddressName(latitude: number, longitude: number) {
    this.loading = true;
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      this.loading = false;
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.address.name = results[0].formatted_address;
          this.addressElementRef.nativeElement.value = results[0].formatted_address;
          this.addressChange.emit(this.address);
        } else {
          this.alertService.showError('No address found for the given geo code.' +
            ' Please add more information into the address detail field.');
        }
      } else {
        this.alertService.showError('Google Geocoder failed to retrieve the address name.' +
          ' You can still save the sandwich with only the geo codes.');
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }

}
