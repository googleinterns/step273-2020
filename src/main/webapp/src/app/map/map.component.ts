import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from 'src/app/location';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  location = {} as Location;

  constructor(private locationService: LocationService) {  }

  ngOnInit() {  

    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
    })
  }
}
