import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;

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
    let centerOfMapCoordinates = new google.maps.LatLng(this.location.lat, this.location.lng);

    let mapOptions: google.maps.MapOptions = {
      center: centerOfMapCoordinates,
      zoom: 10
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
}
