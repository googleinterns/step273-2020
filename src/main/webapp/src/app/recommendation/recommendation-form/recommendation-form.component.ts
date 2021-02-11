import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HiddenGemService } from '../../hidden-gem.service';
import { HiddenGem } from '../../models/hidden-gem';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/models/location';
import { AppComponent } from "src/app/app.component"

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent implements OnInit{

  // ToDo change to recommendationGems
  @Output() hiddenGemRecommendation = new EventEmitter<HiddenGem[]>();
  location = {} as Location;
  hiddenGems = this.appComponent.hiddenGems;

  // Build preference form
  preferenceForm = this.formBuilder.group({
    price: ["", Validators.required],
    rating: ["", Validators.required],
    type: ["", Validators.required]
  });

  constructor(private readonly formBuilder: FormBuilder, private hiddenGemService: HiddenGemService,
  private locationService: LocationService, private appComponent: AppComponent) { }

  ngOnInit() {

    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;

    })

  }

  ngDoCheck(){
    if(this.hiddenGems !== this.appComponent.hiddenGems){
      this.hiddenGems = this.appComponent.hiddenGems;
    }
  }

  // Submit user's preference form
  // Send hidden gem recommendation as output
  onSubmit(): void {
    // filter hidden gems by preference form criteria.
    let recommendationGems = this.filterGems(this.hiddenGems, this.preferenceForm);

    // send top 3 recommendation gems to display in list.
    this.hiddenGemRecommendation.emit(recommendationGems);

  }

  filterGems(hiddenGems: HiddenGem[], preferenceForm: FormGroup): HiddenGem[] {

    for (let i = 0; i < hiddenGems.length; i++) {
      let gem = hiddenGems[i];
      hiddenGems[i].matchScore = 0;
      if(preferenceForm.controls["price"].value == hiddenGems[i].priceLevel){
        hiddenGems[i].matchScore = hiddenGems[i].matchScore + 1;

      }
      if(preferenceForm.controls["rating"].value >= hiddenGems[i].rating){
        hiddenGems[i].matchScore = hiddenGems[i].matchScore + 1;

      }
      if(preferenceForm.controls["type"].value == "any") {
        hiddenGems[i].matchScore = hiddenGems[i].matchScore + 1;

      } else if (preferenceForm.controls["type"].value == hiddenGems[i].types[0] || preferenceForm.controls["type"].value == hiddenGems[i].types[1]){
        hiddenGems[i].matchScore = hiddenGems[i].matchScore + 1;

      }

    }
  
    // shuffle list so recommendation doesn't give a preference to gems with high rating
    // randomise the pool of matching gems for selecting recommendation 
    let recommendationGems: HiddenGem[] = this.shuffleGems(hiddenGems);

    // sort list, gems with highest score populate to the top.
    recommendationGems = hiddenGems.sort((n1,n2) => n2.matchScore - n1.matchScore);

    return recommendationGems.slice(0,3);

  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  /* Randomize list in-place using Durstenfeld shuffle algorithm */
  shuffleGems(hiddenGems: HiddenGem[]): HiddenGem[] {


    for (let i = hiddenGems.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = hiddenGems[i];
        hiddenGems[i] = hiddenGems[j];
        hiddenGems[j] = temp;
    }
    return hiddenGems;
  }
}
