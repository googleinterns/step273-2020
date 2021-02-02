import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hidden Gems'; 
  displayApp = false;

  constructor() { 
  }

  onLocationSetUp(): void {
    this.displayApp = true;
  }
}
