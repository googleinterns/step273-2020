import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/location';

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
    
    //Default Marker
    const marker = new google.maps.Marker({
      position: centerOfMapCoordinates,
      map: this.map,
      title: "Hello World!"
    });
    // const markers = [
    //   { },
    //   { }
    // ];
    const markers = [
      {
        position: new google.maps.LatLng(40.73061, 73.935242),
        map: this.map,
        title: "Marker 1"
      },
      {
        position: new google.maps.LatLng(32.06485, 34.763226),
        map: this.map,
        title: "Marker 2"
      }
    ];
    //Adding Click event to default marker
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: "My first marker."
      });
      infoWindow.open(this.map, marker);
    });

    //Adding default marker to map
    marker.setMap(this.map);

    //Adding other markers
    // this.loadAllMarkers();
  // }


    // loadAllMarkers(): void {

    markers.forEach(markerInfo => {
      // //Creating a new marker object
      const markerObj = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.title
      });

      //Add click event to open info window on marker
      markerObj.addListener("click", () => {
        infoWindow.open(markerInfo.map, markerObj);
      });

      //Adding marker to google map
      markerObj.setMap(this.map);
    });
  }
}
