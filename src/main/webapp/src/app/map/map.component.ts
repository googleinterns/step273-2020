import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { Location } from 'src/app/location';
import { HiddenGemService } from '../hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;
  hiddenGems! : HiddenGem[];
  location = {} as Location;

  constructor(private locationService: LocationService) { 
      this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
    })
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    // Coordinates fetched from the user's location to set the center of the map.
    let centerOfMapCoordinates = new google.maps.LatLng(this.location.lat, this.location.lng);
    let mapOptions: google.maps.MapOptions = {
      center: centerOfMapCoordinates,
      zoom: 10
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    this.loadMarkers();
  }

  loadMarkers(): void {
    // Fetch data from json string from Hidden Gems object.

    // Creating a global infoWindow object that will be reused by all markers
		var infoWindow = new google.maps.InfoWindow();

    for (var i = 0, length = this.hiddenGems.length; i < length; i++) {
      var data = this.hiddenGems[i],
      latLng = new google.maps.LatLng( -33.513059, 151.1234+i);//(data.geometry.lat, data.geometry.lng); 

      // Creating a marker and putting it on the map
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: data.name + data.address + 
          "star rating:" + data.rating
      });
    
    	// Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
			(function(marker, data) {
				// Attaching a click event to the current marker
				google.maps.event.addListener(marker, "click", function(e) {
					infoWindow.setContent(data.name);
					infoWindow.open(this.map, marker);
				});
      })
      (marker, data);
		}
  }
}
