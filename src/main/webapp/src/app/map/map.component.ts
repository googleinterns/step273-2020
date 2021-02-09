import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { Location } from 'src/app/location';
import { HiddenGemService } from '../hidden-gem.service';

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
   
    // Fetch data from json string from Hidden Gems object.
    //const json = HiddenGemService.toString;
    for (var i = 0, length = json.length; i < length; i++) {
      var data = json[i],
      latLng = new google.maps.LatLng(data.lat, data.lng); 

      // Creating a marker and putting it on the map
      var markers[i] = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: data.name
      });
    }
    // const markers = [
    //   {
    //     position: new google.maps.LatLng( -33.513059, 151.1234),
    //     map: this.map,
    //     title: "Quay restaurant"
    //   },
    //   {
    //     position: new google.maps.LatLng(-33.47,151.865),
    //     map: this.map,
    //     title: "Food Van cafe"
    //   }
    // ];

    markers.forEach(markerInfo => {
      // //Creating a new marker object
      const markerObj = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.title,
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
