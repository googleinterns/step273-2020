import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  locationSet = false;
  no = false;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

  onLocationSet(){
    this.locationSet = true;
  }
}
