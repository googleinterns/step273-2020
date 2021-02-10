import { Component, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { Location } from '../models/location';

const GEO_LOCATION_TIMEOUT_MS = 12000;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent{

  location = {} as Location;

  @ViewChild("errorMessage", { static: false })
  errorMessage!: ElementRef;

  constructor(private locationService: LocationService) { }

  handleLocationError(browserHasGeolocation: boolean, message: string): void {
    browserHasGeolocation
      ? this.errorMessage.nativeElement.innerText = "Geolocation services have failed. Try a default location. " + message
      : this.errorMessage.nativeElement.innerText = "Geolocation is not supported by this browser. Try a default location."

  }

  locationSuccess(position: Position): void {
    this.location.lat = position.coords.latitude;
    this.location.lng = position.coords.longitude;
    this.setLocation();
  }

  // Switch statement code from
  // https://www.w3schools.com/html/html5_geolocation.asp
  locationError(error: PositionError): void {
    var message = "An unknown error occured."
    switch(error.code){
      case error.PERMISSION_DENIED:
        message = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out."
        break;
    }
    this.handleLocationError(true, message)
  }

  enableNavigatorLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.locationSuccess = this.locationSuccess.bind(this),	
        this.locationError = this.locationError.bind(this),	
        {timeout: GEO_LOCATION_TIMEOUT_MS});
    } else {
      this.handleLocationError(false, "");
    }
  }

  getSydneyLocation(): void {
    this.location.lat = -33.8688;
    this.location.lng = 151.2093;
    this.setLocation();
  }

  getAdelaideLocation(): void {
    this.location.lat = -34.9285;
    this.location.lng = 138.6007;
    this.setLocation();
  }

  setLocation(){
    // store in location service
    this.locationService.setLocation(this.location);
  }
}
