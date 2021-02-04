import { Component, AfterViewInit, ViewChild, ElementRef } from 
  '@angular/core';
import { } from 'googlemaps';



@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  mapEl!: google.maps.Map;
  lat = -34;
  lng = 154;
  
  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 10
  };

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.mapEl = new google.maps.Map(this.mapContainer.nativeElement, this.mapOptions);
  }
}
