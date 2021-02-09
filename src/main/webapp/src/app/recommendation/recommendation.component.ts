import { Component } from '@angular/core';
import { HiddenGem } from '../models/hidden-gem';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent  {

  hiddenGems: HiddenGem[] = [];
  formSubmitted = false;

  constructor() { }

  // Form submitted so can display hidden gem recommendations.
  onFormSubmit(hiddenGems: HiddenGem[]){
    this.formSubmitted = true;
    this.hiddenGems = hiddenGems;
  }
}
