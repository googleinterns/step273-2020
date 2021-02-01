import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location';
import { Router } from '@angular/router';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Output() locationSet: EventEmitter<void> = new EventEmitter()
  // TODO set a location interface variable that you set?
  location = {} as Location;

  // TODO change to VIEWCHILD
  //errorMessage = document.getElementById("coord") as HTMLParagraphElement;
  constructor(private locationService: LocationService, private router: Router) { }

  
  ngOnInit(){
  } 

  handleLocationError(browserHasGeolocation: boolean): void {

    const errorMessage = document.getElementById("coord") as HTMLParagraphElement;
    browserHasGeolocation
      ? errorMessage.innerText = "Geolocation services have failed. Try a default location."
      : errorMessage.innerText = "Geolocation is not supported by this browser. Try a default location."  
  
  }

  getGeolocation(): void {
    console.log("geolocation")
    if (navigator.geolocation) {

      // TO DO implement error handling with codes?
      //navigator.geolocation.getCurrentPosition(getPosition, showError);
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          console.log(this.location);
          this.setLocation();
        },
        () => {
          this.handleLocationError(true);
          console.log("boo");
          // remove button/diable
        }
      );
    } 
      this.handleLocationError(false);
      console.log("boohoo");
      // remove button/disable

    
    console.log("boohoo ahhhh");
  }

  getSydneyLocation(): void {
    console.log("sydney");
    this.location.lat = -33.8688;
    this.location.lng = 151.2093;
    console.log(this.location);
    this.setLocation();
  }

  getAdelaideLocation(): void {
    console.log("adelaide")
    this.location.lat = -34.9285;
    this.location.lng = 138.6007;
    console.log(this.location);
    this.setLocation();

  }

  setLocation(){
    // if location set them redirect/ show rest of homepage
    this.locationService.setLocation(this.location);
    this.locationSet.emit();

  }
}

