import { Component, AfterViewInit, ViewChild, ElementRef } from 
  '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;
  // Set initial location to Sydney coordinates.
  lat = -33.865143;
  lng = 154;
  
  // Coordinates to set the center of the map.
  centerOfMapCoordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.centerOfMapCoordinates,
    zoom: 10
  };

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, this.mapOptions);
  }
}
