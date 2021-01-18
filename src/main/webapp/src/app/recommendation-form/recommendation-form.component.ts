import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent implements OnInit {

  // Build preference form
  preferenceForm = this.fb.group({
    cuisine: "",
    price: "",
    rating:"",
    type: ""
  });

  constructor(private fb: FormBuilder) { }
   
  ngOnInit(){
  }

  // Submit user's preference form
  onSubmit(): void {
    console.log(this.preferenceForm);
  }

}
