import { Component } from '@angular/core';
import { HiddenGem } from '../../models/hidden-gem';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recommendation-page',
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.css']
})
export class RecommendationPageComponent  {

  hiddenGems: HiddenGem[] = [];
  formData!: FormGroup;
  formSubmitted = false;

  constructor() { }

  // Form submitted so can display hidden gem recommendations.
  onFormSubmit(formData: FormGroup){
    this.formSubmitted = true;
    this.formData = formData;
    console.log("the form is subimtted yall")
    console.log(formData)
  }
}
