import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/location';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

// export class MapComponent implements OnInit {

//   location = {} as Location;

//   constructor(private locationService: LocationService) {  }

//   ngOnInit() {  

//     this.locationService.getLocation
//       .subscribe(location => {
//         this.location = location;
//     })
export class MapComponent implements AfterViewInit, OnInit {

  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;

  // Set initial location to Sydney coordinates.
  location = {} as Location;
  // lat = -33.865143;
  // lng = 154;

  constructor(private locationService: LocationService) {  }
  
  ngOnInit() {  
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
    })
  }

  // Coordinates to set the center of the map.
  centerOfMapCoordinates = new google.maps.LatLng(this.location.lat, this.location.lng);

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
