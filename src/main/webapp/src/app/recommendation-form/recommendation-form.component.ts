import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent{

  // Build preference form
  preferenceForm = this.formBuilder.group({
    price: "",
    rating:"",
    type: ""
  });

  constructor(private readonly formBuilder: FormBuilder) { }   

  // Submit user's preference form
  onSubmit(): void {
    console.log(this.preferenceForm);
  }

}
