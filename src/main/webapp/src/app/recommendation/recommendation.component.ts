import { Component } from '@angular/core';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent  {

  formSubmitted = false;

  constructor() { }

  onFormSubmit(){
    this.formSubmitted = true;
  }

}
