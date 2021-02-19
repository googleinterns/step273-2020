import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HiddenGem } from '../../models/hidden-gem';
import { AppComponent } from "src/app/app.component"

@Component({
  selector: 'app-recommendation-form',
  templateUrl: './recommendation-form.component.html',
  styleUrls: ['./recommendation-form.component.css']
})
export class RecommendationFormComponent {

  @Output() hiddenGemRecommendation = new EventEmitter<HiddenGem[]>();
  hiddenGems = this.appComponent.hiddenGems;
  
  @ViewChild("errorMessage", { static: false })
  errorMessage!: ElementRef;

  // Build preference form
  preferenceForm = this.formBuilder.group({
    price: ["", Validators.required],
    rating: ["", Validators.required],
    type: ["", Validators.required]
  });

  constructor(private readonly formBuilder: FormBuilder, private appComponent: AppComponent) { }

  ngDoCheck(){
    if(this.hiddenGems !== this.appComponent.hiddenGems){
      this.hiddenGems = this.appComponent.hiddenGems;
    }
  }

  // Submit user's preference form
  // Send hidden gem recommendation as output
  async onSubmit() {
    // filter hidden gems by preference form criteria.
    let result = this.filterGems(this.hiddenGems, this.preferenceForm);
// TO DO TEST THIS
    if(Object.keys(result).length == 0) {
      this.errorMessage.nativeElement.innerText = "Sorry there are no hidden gems matching your preferences"
    }

    // send top 3 recommendation gems to display in list.
    this.hiddenGemRecommendation.emit(result);
  }

  /**
   * A function that gives each hidden gem a match score based on how many user preferences
   * it matches. Then the function is randomly shuffled and sorted to get the 3 gems
   * with the highest match score to display to the user.
   * @param hiddenGems      the list of hidden gems to filter based on user preferences
   * @param preferenceForm  the users preference data
   * @return HiddenGem[]    the top 3 recommendation  
   */
  filterGems(hiddenGems: HiddenGem[], preferenceForm: FormGroup): HiddenGem[] {

    let recommendationGems: HiddenGem[] = Array.from(hiddenGems);

    for (let i = 0; i < recommendationGems.length; i++) {
      let gem = recommendationGems[i];
      recommendationGems[i].matchScore = 0;

      // Display a more user friendly message.
      if(gem.priceLevel == "null") {
        gem.priceLevel = "Unavailable"
      }

      // A match is same price level as user. 
      if(preferenceForm.controls["price"].value == recommendationGems[i].priceLevel){
        recommendationGems[i].matchScore = recommendationGems[i].matchScore + 1;
        
      } else if (preferenceForm.controls["price"].value == "any"){
        recommendationGems[i].matchScore = recommendationGems[i].matchScore + 1;
      }

      // A match if hidden gem is greater than or equal to user preference rating
      if(preferenceForm.controls["rating"].value <= recommendationGems[i].rating){
        recommendationGems[i].matchScore = recommendationGems[i].matchScore + 1;

      }

      // A match if user preference for type [any, restaurant, cafe] is included
      // in hidden gem type.
      if(preferenceForm.controls["type"].value == "any") {
        recommendationGems[i].matchScore = recommendationGems[i].matchScore + 1;

      } else if (recommendationGems[i].types.includes(preferenceForm.controls["type"].value)){
        recommendationGems[i].matchScore = recommendationGems[i].matchScore + 1;
      }
    }
  
    // shuffle list so recommendation doesn't give a preference to gems with high rating
    // randomise the pool of matching gems for selecting recommendation 
    recommendationGems = this.shuffleGems(recommendationGems);
    
    // sort list, gems with highest score populate to the top.
    recommendationGems.sort((n1,n2) => n2.matchScore - n1.matchScore);

    // return top 3 from list to display.
    return recommendationGems.slice(0,3);
  }

  /**
   * A function to random the list of hidden gems using an in-place shuffle.
   * Durstenfeld shuffle algorithm. 
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @param hiddenGems      the hidden gems list ranked by descending rating.
   * @return  HiddenGem[]   returns the list in a random order
   */
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
