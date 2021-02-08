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

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    
    // Set initial location to Sydney coordinates.
    const lat = -33.865143;
    const lng = 151.2093;
    
    // Coordinates to set the center of the map.
    const centerOfMapCoordinates = new google.maps.LatLng(lat, lng);

    const mapOptions: google.maps.MapOptions = {
      center: centerOfMapCoordinates,
      zoom: 10
    };
    const map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    //Default Marker
    const marker = new google.maps.Marker({
      position: centerOfMapCoordinates,
      map: map,
      title: "Hello World!"
    });

    const markers = [
      {
        position: new google.maps.LatLng(40.73061, 73.935242),
        map: map,
        title: "Marker 1"
      },
      {
        position: new google.maps.LatLng(32.06485, 34.763226),
        map: map,
        title: "Marker 2"
      }
    ];
    //Adding Click event to default marker
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: "My first marker."
      });
      infoWindow.open(map, marker);
    });

    //Adding default marker to map
    marker.setMap(map);

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
      markerObj.setMap(map);
    });
    }
}
