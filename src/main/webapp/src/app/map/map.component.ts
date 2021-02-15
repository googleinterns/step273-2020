import { Component, ViewChild, ElementRef} from '@angular/core';
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

export class MapComponent {

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
    let photoUrl = '';
    let type = '';
    let openingStatus = '';

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

      // Get the photo URL.
      if (currentHiddenGem.photoReference != null) {
        photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
          + currentHiddenGem.photoReference
          + "&key=AIzaSyCBb8QQBQal9jDNl3ZG6f3bS6ROX2MtYIM";
      }
      else {
        photoUrl = "https://www.flaticon.com/svg/vstatic/svg/3716/3716538.svg?token=exp=1612753174~hmac=f38de8989e705031bdecb2da1464c379"
      }

      // Get the business type.
      if (currentHiddenGem.types[0] != null && (currentHiddenGem.types[0] === 'restaurant' || currentHiddenGem.types[0] === 'cafe'))
        type = currentHiddenGem.types[0];
      else if (currentHiddenGem.types[1] != null && (currentHiddenGem.types[1] === 'restaurant' || currentHiddenGem.types[1] === 'cafe'))
        type = currentHiddenGem.types[1];

      // Get the business' opening status.
      if (currentHiddenGem.openingHours)
        openingStatus = "Open Now";
      else
        openingStatus = "Currently Closed"

      let infoWindowContent = this.createInfoWindow(currentHiddenGem.name, currentHiddenGem.address, photoUrl, type, openingStatus, currentHiddenGem.rating);

      let infoWindow = new google.maps.InfoWindow();

      marker.addListener("click", () => {
        this.map.setZoom(ON_MARKER_MAP_ZOOM);
        this.map.setCenter(latLng);
        infoWindow.setContent(infoWindowContent);
        infoWindow.setPosition(latLng);
        infoWindow.open(this.map, marker);
      });
    }
  }

  createInfoWindow(name: string, address: string, url: string, businessType: string, openingStatus: string, rating: number) {
    const divElement = document.createElement('div');
    const nameElement = document.createElement('h2');
    nameElement.innerText = name;
    nameElement.className = "mat-title";

    const addressElement = document.createElement('p');
    addressElement.innerText = address;
    addressElement.className = "mat-subheading-1";
    addressElement.setAttribute('style', 'margin-top: -20px;')

    const imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.alt = name;
    imageElement.setAttribute('style', 'width:100%; height:100px; object-fit: cover;')

    const detailsDivElement = document.createElement('div');
    detailsDivElement.setAttribute('style', 'margin-left: 15%')
    const businessTypeElement = document.createElement('p');
    businessTypeElement.innerText = businessType;
    businessTypeElement.className = "mat-body-2";
    businessTypeElement.setAttribute('style', 'float: left;padding: 10px;')
    const ratingElement = document.createElement('p');
    ratingElement.innerText = "Star rating: " + rating;
    ratingElement.className = "mat-body-2";
    ratingElement.setAttribute('style', 'float: left;padding: 10px;')
    const openingStatusElement = document.createElement('p');
    openingStatusElement.innerText = openingStatus;
    openingStatusElement.className = "mat-body-2";
    openingStatusElement.setAttribute('style', 'float: left;padding: 10px;')
    detailsDivElement.appendChild(businessTypeElement);
    detailsDivElement.appendChild(ratingElement);
    detailsDivElement.appendChild(openingStatusElement);

    divElement.appendChild(nameElement);
    divElement.appendChild(addressElement);
    divElement.appendChild(imageElement);
    divElement.appendChild(detailsDivElement);

    return divElement;
  }
}
