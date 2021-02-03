import { Component, OnInit } from '@angular/core';
import { HiddenGem } from '../hidden-gem';
import { LocationService } from '../location.service';
import { Location } from 'src/app/location';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit   {

  hiddenGems: HiddenGem[] = [];
  formSubmitted = false;

  location = {} as Location;
  constructor(private locationService: LocationService) {  }


  ngOnInit() {  
    this.locationService.getLocation.subscribe(
      location => this.location = location
    )
  }

  // Form submitted so can display hidden gem recommendations.
  onFormSubmit(hiddenGems: HiddenGem[]){
    this.formSubmitted = true;
    this.hiddenGems = hiddenGems;
  } 
}
