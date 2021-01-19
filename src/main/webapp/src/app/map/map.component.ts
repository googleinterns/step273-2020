import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-map',
  templateUrl: `map.component.html`,
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  
  ImagePath: string; 
  
  constructor() {
    //image location 
    this.ImagePath = "./assets/map.jpg";
   }
  ngOnInit() {
    
  }
}
