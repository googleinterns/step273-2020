import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location';
import { string } from 'prop-types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent{

  @Output() locationStored: EventEmitter<void> = new EventEmitter()
	location = {} as Location;
	locationFound = false;

  @ViewChild("errorMessage", { static: false })
  errorMessage!: ElementRef;

  constructor(private locationService: LocationService) { }

  
  handleLocationError(browserHasGeolocation: boolean, message: string): void {

    // TODO change to VIEWCHILD?
		// errorMessage = document.getElementById("coord") as HTMLParagraphElement;
		
    //const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;
    browserHasGeolocation
      ? this.errorMessage.nativeElement.innerText = "Geolocation services have failed. Try a default location. " + message
      : this.errorMessage.nativeElement.innerText = "Geolocation is not supported by this browser. Try a default location."  

  }

  locationSuccess(position: Position): void {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      this.setLocation();
  }

  locationError(error : PositionError): void {

		var message:string;

		message = "An unknown error occured/"
		switch(error.code) {
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
    this.handleLocationError(true, message);
	}
	


  enableNavigatorLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.locationSuccess = this.locationSuccess.bind(this),
        this.locationError = this.locationError.bind(this),
      {timeout:10000});
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
    this.locationStored.emit();
  }
}

