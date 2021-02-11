import { Component, Input, AfterViewInit, ViewChild, ElementRef,  SimpleChanges} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';
import { HiddenGem } from 'src/app/models/hidden-gem';
import { AppComponent } from 'src/app/app.component';
import { string } from 'prop-types';

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

    // Creating a global infoWindow object that will be reused by all markers
    //var infoWindow = new google.maps.InfoWindow();
    
    var length = this.hiddenGems.length;
    var markers = new Array;
    markers=[];
    for (var i = 0; i < length; i++) {
      
      var data = this.hiddenGems[i],
      latLng = new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng); 
      
      // Creating a marker and putting it on the map.
      var marker = new google.maps.Marker({
				position: latLng,
				map: this.map,
        title: data.name
      });
      
      markers.push(marker);
      var contentString = data.name + data.vicinity +
          ", Star rating:" + data.rating;
      console.log(contentString); 
      
      var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        position: latLng
      });
      
      google.maps.event.addListener(markers[i], "click", () => {
      //markers[i].addListener("click", () => {
        infoWindow.open(this.map, markers[i]);
      });

    }
  }
  
}
