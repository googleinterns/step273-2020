import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hidden Gems'; 
  //routerUrl: string
  locationSet = false;
  hideNavBar = true;
  constructor(public router: Router) { 
    if(this.router.url == "/") {
      this.hideNavBar = true;
      console.log("true location" + this.hideNavBar);
    } else {
      this.hideNavBar = false;
      console.log("nooo location" + this.hideNavBar);
    }
  }

  ngOnInit() {
  }

  onLocationSet(): void {
    this.locationSet = true;
  }
}