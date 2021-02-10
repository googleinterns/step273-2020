import { Component, Input, AfterViewInit, ViewChild, ElementRef,  SimpleChanges} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';
import { HiddenGem } from 'src/app/models/hidden-gem';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  
  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;
  hiddenGems = this.appComponent.hiddenGems;
  type!: string;
  location = {} as Location;

  constructor( private appComponent: AppComponent, private locationService: LocationService) {
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
      })
  }

  ngDoCheck() {
    if (this.hiddenGems !== this.appComponent.hiddenGems) {
      this.hiddenGems = this.appComponent.hiddenGems;
      this.mapInitializer();
    }
  }
  
  ngAfterViewInit(): void {
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
    // Declare array of markers to keep the fetched data from json string from Hidden Gems object.
    var markers = new Array();

    var length = this.hiddenGems.length;
    for (var i = 0; i < length; i++) {
      
      // This prevent the tests from failing with "Cannot read property '0' of undefined"
      if (this.hiddenGems[i].types != null && this.hiddenGems[i].types[0] != null) {
        this.type = this.hiddenGems[i].types[0];
      }

      var data = this.hiddenGems[i],
      latLng = new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng); 
      console.log(data.name);
      // Creating a marker and putting it on the map.
      const marker = [{
        position: latLng,
        map: this.map,
        title: data.name + data.vicinity +
          "star rating:" + data.rating
      }];
      markers.push(marker);
    }
    
    markers.forEach(markerInfo => {
      //Creating a new marker object
      const markerObj = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.getTitle()
      });

      //Add click event to open info window on marker
      markerObj.addListener("click", () => {
        infoWindow.open(markerInfo.getMap(), markerObj);
      });

      //Adding marker to google map
      markerObj.setMap(this.map);
    });
  }
}
