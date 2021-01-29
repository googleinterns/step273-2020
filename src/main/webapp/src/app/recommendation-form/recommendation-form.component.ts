import { Component, Output, EventEmitter } from '@angular/core';
import {  FormBuilder, Validators} from '@angular/forms';
import { HiddenGemService } from '../hidden-gem.service';
import { HiddenGem } from '../hidden-gem';

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent{

  @Output() hiddenGemRecommendation = new EventEmitter<HiddenGem[]>()

  // Build preference form
  preferenceForm = this.formBuilder.group({
    price: ["", Validators.required],
    rating: ["", Validators.required],
    type: ["", Validators.required]
  });

  constructor(private readonly formBuilder: FormBuilder, private hiddenGemService: HiddenGemService) { }

  // Submit user's preference form
  // Send hidden gem recommendation as output
  onSubmit(): void {
    this.hiddenGemService.findHiddenGemRecommendation(this.preferenceForm.value)
      .subscribe(hiddenGems => {
        this.hiddenGemRecommendation.emit(hiddenGems);
    })   
  }

}
