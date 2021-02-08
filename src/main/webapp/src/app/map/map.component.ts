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
  lng = 151.2093;
  
  // Coordinates to set the center of the map.
  centerOfMapCoordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.centerOfMapCoordinates,
    zoom: 10
  };

  /* Editable marker that displays when a user clicks in the map. */
let editMarker;

/** Creates a marker that shows a textbox the user can edit. */
createMarkerForEdit(lat, lng) {
  // If we're already showing an editable marker, then remove it.
  if (this.editMarker) {
    this.editMarker.setMap(null);
  }

  editMarker =
      new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

  const infoWindow =
      new google.maps.InfoWindow({content: buildInfoWindowInput(lat, lng)});

  // When the user closes the editable info window, remove the marker.
  google.maps.event.addListener(infoWindow, 'closeclick', () => {
    editMarker.setMap(null);
  });

  infoWindow.open(yourMap, editMarker);
}
  // When the user clicks in the map, show a marker with a text box the user can edit.
  map.addListener('click', (event) => {
    createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
  });
  
  const response = await fetch('/your-map-data');
  const mapMarkers = await response.json();

  mapMarkers.forEach((marker) => {
    addMarker(yourMap, marker.lat, marker.lng, marker.title, marker.description);
  });
}

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, this.mapOptions);
  }
}
