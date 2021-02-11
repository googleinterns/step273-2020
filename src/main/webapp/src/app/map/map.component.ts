import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent {
  
  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;
  hiddenGems = this.appComponent.hiddenGems;
  type!: string;
  location = {} as Location;

  constructor( private appComponent: AppComponent, private locationService: LocationService) {
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
      })
  }

  ngDoCheck() {
    if (this.hiddenGems !== this.appComponent.hiddenGems) {
      this.hiddenGems = this.appComponent.hiddenGems;
      this.mapInitializer();
    }
  }
  
  mapInitializer(): void {
    // Coordinates fetched from the user's location to set the center of the map.
    let centerOfMapCoordinates = new google.maps.LatLng(this.location.lat, this.location.lng);
    let mapOptions: google.maps.MapOptions = {
      center: centerOfMapCoordinates,
      zoom: 15
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    var androidImg = '../../assets/images/android.png';
    //Default Marker
    let userMarker = new google.maps.Marker({
      position: centerOfMapCoordinates,
      map: this.map,
      title: "user location",
      icon : androidImg
    });

    //Adding Click event to default marker
    userMarker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: "You Are Here!"
      });
      infoWindow.open(this.map, userMarker);
    });
    this.loadMarkers();
  }

  loadMarkers(): void {
    var diamondIcon = '../../assets/images/gem.png';

    // Declare array of markers to keep the fetched data from json string from Hidden Gems object.    let length = this.hiddenGems.length;
    let length = this.hiddenGems.length;
    for (let i = 0; i < length; i++) {
      let data = this.hiddenGems[i],
      latLng = new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng); 
      
      // Creating a marker and putting it on the map.
      let marker = new google.maps.Marker({
				position: latLng,
				map: this.map,
        title: data.name,
        icon: diamondIcon
      });
      
      let contentString = data.name + data.vicinity +
          ", Star rating:" + data.rating;

      let infoWindow = new google.maps.InfoWindow();
      
      marker.addListener("click", () => {
        this.map.setZoom(17);
        this.map.setCenter(latLng);
        infoWindow.setContent(contentString);
        infoWindow.setPosition(latLng);
        infoWindow.open(this.map, marker);
      });
    }
  }
}
