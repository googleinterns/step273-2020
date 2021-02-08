import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  FormBuilder, Validators} from '@angular/forms';
import { HiddenGemService } from 'src/app/hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';
import { LocationService } from 'src/app/location.service';
import { Location } from 'src/app/location';

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent implements OnInit{

  @Output() hiddenGemRecommendation = new EventEmitter<HiddenGem[]>();
  location = {} as Location;

  // Build preference form
  preferenceForm = this.formBuilder.group({
    price: ["", Validators.required],
    rating: ["", Validators.required],
    type: ["", Validators.required]
  });

  constructor(private readonly formBuilder: FormBuilder, private hiddenGemService: HiddenGemService,
  private locationService: LocationService) { }

  ngOnInit() {  

    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
        
    })
    
  }
  // Submit user's preference form
  // Send hidden gem recommendation as output
  onSubmit(): void {
    this.hiddenGemService.findHiddenGemRecommendation(this.preferenceForm.value)
      .subscribe(hiddenGems => {
        this.hiddenGemRecommendation.emit(hiddenGems);
    })   
  }

}
