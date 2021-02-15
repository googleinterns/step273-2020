import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';
import { AppComponent } from 'src/app/app.component';

const DEFAULT_MAP_ZOOM = 15;
const ON_MARKER_MAP_ZOOM = 17;

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false })
  mapContainer!: ElementRef;
  map!: google.maps.Map;
  hiddenGems = this.appComponent.hiddenGems;
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

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer(): void {
    // Coordinates fetched from the user's location to set the center of the map.
    let centerOfMapCoordinates = new google.maps.LatLng(this.location.lat, this.location.lng);
    let mapOptions: google.maps.MapOptions = {
      center: centerOfMapCoordinates,
      zoom: DEFAULT_MAP_ZOOM
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    var androidImg = '../../assets/images/android.png';

    let userMarker = new google.maps.Marker({
      position: centerOfMapCoordinates,
      map: this.map,
      title: "user location",
      icon : androidImg
    });

    //Adding Click event to user marker
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
    if (this.hiddenGems) {
      // For loop to go through all gems and retrieve information about them.
      for (let i = 0; i < this.hiddenGems.length; i++) {
        let currentHiddenGem = this.hiddenGems[i],
        latLng = new google.maps.LatLng(currentHiddenGem.lat,
          currentHiddenGem.lng);

        // Creating a marker and putting it on the map.
        let marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: currentHiddenGem.name,
          icon: diamondIcon
        });

        let contentString = currentHiddenGem.name + " " + currentHiddenGem.address +
            ", Star rating: " + currentHiddenGem.rating;

        let infoWindow = new google.maps.InfoWindow();

        marker.addListener("click", () => {
          this.map.setZoom(ON_MARKER_MAP_ZOOM);
          this.map.setCenter(latLng);
          infoWindow.setContent(contentString);
          infoWindow.setPosition(latLng);
          infoWindow.open(this.map, marker);
        });
      }
    }
  }
}
