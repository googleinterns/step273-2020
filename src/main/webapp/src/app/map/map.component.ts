import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';1
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
    // Hard-coded dummy markers.
    const markers = [
      {
        position: new google.maps.LatLng( -33.513059, 151.1234),
        map: this.map,
        title: "name: Quay restaurant, address: 123 Sydney Street, Sydney, star rating: 3"
      },
      {
        position: new google.maps.LatLng(-33.47,151.865),
        map: this.map,
        title: "name: Food Van cafe, address: 123 Sydney Street, Sydney, star rating: 3"
      }
    ];

    markers.forEach(markerInfo => {
      // Creating a new marker object.
      const markerObj = new google.maps.Marker({
        ...markerInfo
      });

      // Creating a new info window with markers info.
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.title,
      });

      // Add click event to open info window on marker.
      markerObj.addListener("click", () => {
        infoWindow.open(markerInfo.map, markerObj);
      });

      // Adding marker to google map.
      markerObj.setMap(this.map);
    });
  }
}
