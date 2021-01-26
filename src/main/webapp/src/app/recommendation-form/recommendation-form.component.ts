import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HiddenGemService } from '../hidden-gem.service';

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent{

   @Output() formSubmit: EventEmitter<void> = new EventEmitter()

   hiddenGems : any = [];
  // Build preference form
  preferenceForm = this.formBuilder.group({
    price: "",
    rating:"",
    type: ""
  });

  constructor(private readonly formBuilder: FormBuilder, private hiddenGemService: HiddenGemService) { }

  // Submit user's preference form
  onSubmit(): void {
    console.log(this.preferenceForm.value);
    //this.hiddenGemService.findHiddenGemReccomendation(this.preferenceForm.value);
    this.hiddenGemService.findHiddenGemReccomendation(this.preferenceForm.value)
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
        this.hiddenGemService.updateTop3Gems(hiddenGems);
    })
    this.formSubmit.emit();
    // 
  }

}
