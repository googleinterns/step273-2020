import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { Location } from 'src/app/location';
import { HiddenGemService } from '../hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;
  hiddenGems! : HiddenGem[];
  location = {} as Location;

  constructor(private hiddenGemService: HiddenGemService, private locationService: LocationService) {
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
      })
    this.hiddenGemService.getAllHiddenGems()
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
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
    // Declare array of markers to keep the fetched data from json string from Hidden Gems object.
    var markers = new Array();

    for (var i = 0, length = this.hiddenGems.length; i < length; i++) {
      var data = this.hiddenGems[i],
      latLng = new google.maps.LatLng( -33.513059, 151.1234+i);  
      // The coordinates above are dummy coordinates, once switchToRealData is merged to master I will be able to use
      //(data.geometry.lat, data.geometry.lng); 

      // Creating a marker and putting it on the map.
      const marker = [{
        position: latLng,
        map: this.map,
        title: data.name + data.address + 
          "star rating:" + data.rating
      }];
      markers.push(marker);
    }
    
    markers.forEach(markerInfo => {
      //Creating a new marker object
      const markerObj = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.getTitle()
      });

      //Add click event to open info window on marker
      markerObj.addListener("click", () => {
        infoWindow.open(markerInfo.getMap(), markerObj);
      });

      //Adding marker to google map
      markerObj.setMap(this.map);
    });
  }
}
