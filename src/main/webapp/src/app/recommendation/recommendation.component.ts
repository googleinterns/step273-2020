import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  formSubmitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(){
    this.formSubmitted = true;
  }

}
