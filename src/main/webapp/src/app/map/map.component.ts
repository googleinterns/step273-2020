import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  constructor() {  }
  zoom = 12
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  ngOnInit() { }
}
