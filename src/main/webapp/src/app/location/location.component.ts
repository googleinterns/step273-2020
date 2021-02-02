import { Component, Output, EventEmitter} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent{

  @Output() locationStored: EventEmitter<void> = new EventEmitter()
  location = {} as Location;


  constructor(private locationService: LocationService) { }

  
  handleLocationError(browserHasGeolocation: boolean): void {

    // TODO change to VIEWCHILD?
    // errorMessage = document.getElementById("coord") as HTMLParagraphElement;
    const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;
    browserHasGeolocation
      ? errorMessage.innerText = "Geolocation services have failed. Try a default location."
      : errorMessage.innerText = "Geolocation is not supported by this browser. Try a default location."  

  }

  getGeolocation(): void {

    if (navigator.geolocation) {
      // TO DO implement error handling with codes?
      // navigator.geolocation.getCurrentPosition(getPosition, showError);
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          this.setLocation();
        },
        () => {
          this.handleLocationError(true);
        }
      );
    } else {
      this.handleLocationError(false);
    }
    // TODO: Searching the world for your location message? 
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

