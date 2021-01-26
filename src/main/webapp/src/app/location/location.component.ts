import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor() { }


  ngOnInit(){
    const locationButton = document.getElementById("locationButton") as HTMLButtonElement;
    const locationDisplay = document.getElementById("coord") as HTMLParagraphElement;
    locationButton.textContent = "Pan to Current Location";

    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            locationDisplay.innerHTML = 
                "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude;
            console.log("Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude)
            // const pos = {
            //   lat: position.coords.latitude,
            //   lng: position.coords.longitude,
            // };
          },
        );
      } 
    });
  } 

  handleLocationError(browserHasGeolocation: boolean): void {
  // console.log(browserHasGeolocation
  //     ? "Error: The Geolocation service failed."
  //     : "Error: Your browser doesn't support geolocation.")
  // }    
  console.log("plz work")
  }
}

