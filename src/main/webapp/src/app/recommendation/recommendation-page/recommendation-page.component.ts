import { Component } from '@angular/core';
import { HiddenGem } from 'src/app/hidden-gem';

@Component({
  selector: 'app-recommendation-page',
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.css']
})
export class RecommendationPageComponent  {

  hiddenGems: HiddenGem[] = [];
  formSubmitted = false;

  constructor() { }

  // Form submitted so can display hidden gem recommendations.
  onFormSubmit(hiddenGems: HiddenGem[]){
    this.formSubmitted = true;
    this.hiddenGems = hiddenGems;
  } 
}
