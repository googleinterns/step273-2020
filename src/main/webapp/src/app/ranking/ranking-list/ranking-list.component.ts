import { Component, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HiddenGem } from 'src/app/models/hidden-gem';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements AfterViewInit {
  // There are 3 arrays of hidden gems to allow users to filter the ranking to
  // see either a ranking of restaurants, a ranking of cafes, or a ranking of both
  hiddenGems = this.appComponent.hiddenGems;
  restaurants = [] as HiddenGem[];
  cafes = [] as HiddenGem[];

  // This shows which ranking list will be displayed
  // Options: only restaurants, only cafes, or both
  show = "any";

  constructor(private appComponent: AppComponent) { }

  ngDoCheck() {
    if (this.hiddenGems !== this.appComponent.hiddenGems) {
      this.hiddenGems = this.appComponent.hiddenGems;
      this.restaurants = this.hiddenGems.filter(hiddenGem => hiddenGem.types[0] === "restaurant");
      this.cafes = this.hiddenGems.filter(hiddenGem => hiddenGem.types[0] === "cafe");
    }
  }

  // This allows the page to still display the filtered lists after there are
  // no more changes caught by ngDoCheck().
  ngAfterViewInit() {
    if (this.hiddenGems) {
    this.restaurants = this.hiddenGems.filter(hiddenGem => hiddenGem.types[0] === "restaurant");
    this.cafes = this.hiddenGems.filter(hiddenGem => hiddenGem.types[0] === "cafe");
    }
  }

  updateShow(showType: string) {
    this.show = showType;
  }
}
