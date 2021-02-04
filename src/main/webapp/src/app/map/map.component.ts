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
  mapEl!: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.mapEl = new google.maps.Map(this.mapContainer.nativeElement, this.mapOptions);
  }
}
