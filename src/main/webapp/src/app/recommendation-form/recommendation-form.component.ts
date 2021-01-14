import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent implements OnInit {

  restaurantPrefereces: string[] = ['Thai', 'Mexican', 'Indian', 'Vegan', 'Sushi', 'Take-away'];
  preferenceForm: FormGroup;  


  constructor(private fb: FormBuilder) { }
   
  ngOnInit(){
    this.initialiseForm()
  }

  initialiseForm(): void {
    this.preferenceForm = this.fb.group({
      price: this.fb.group({
        $ : false,
        $$ : false,
        $$$ : false,
        $$$$ : false,
      }),
      rating: this.fb.group({
        1 : false,
        2 : false,
        3 : false,
        4 : false,
        5 : false,
      }),
      type: ""
    });
  }

  onSubmit(): void {
    console.log(this.preferenceForm);
  }
}
