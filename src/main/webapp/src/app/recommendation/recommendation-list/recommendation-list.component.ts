import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { HiddenGem } from '../../models/hidden-gem';
import { AppComponent } from 'src/app/app.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements  OnChanges {

  @Input() formData!: FormGroup;
  hiddenGems = this.appComponent.hiddenGems;

  constructor(private appComponent: AppComponent) {}

  ngDoCheck() {
    if (this.hiddenGems !== this.appComponent.hiddenGems) {
      this.hiddenGems = this.appComponent.hiddenGems;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("have you changed")
    console.log(this.formData);
    if (changes.formData && changes.formData.currentValue) {
      this.filterGems(this.hiddenGems, this.formData);
    }
    
  }

  private filterGems(hiddenGems: HiddenGem[], formData: FormGroup) {
    console.log("update");
    //console.log(hiddenGems);
    console.log(formData.controls["price"].value);
    // After form data been update// 

    // Add in a matches attribute to HiddenGem Interface - initally set to 0.
    // Create object with array of hidden gem id and matches
    // If HiddenGem.types includes FormGroup
    // matches ++
    // If HiddenGem price == FormGroup price Level
    // ++
    // If HiddenGem type - for each if one equals form group - type
    // matches ++
    // Add to list of match gems

    // Sort list by matches higest to lowest.
  }
}
