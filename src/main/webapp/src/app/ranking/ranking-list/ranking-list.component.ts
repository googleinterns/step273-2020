import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/models/location';
import { HiddenGem } from 'src/app/models/hidden-gem';


@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  hiddenGems = this.appComponent.hiddenGems;
  restaurants = [] as HiddenGem[];
  cafes = [] as HiddenGem[];
  location = {} as Location;
  show = "any";

  constructor(private locationService: LocationService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
      })
  }

  ngDoCheck() {
    if (this.hiddenGems !== this.appComponent.hiddenGems) {
      this.hiddenGems = this.appComponent.hiddenGems;
      this.restaurants = this.hiddenGems.filter(hiddenGem => hiddenGem.types[0] === "restaurant");
      this.cafes = this.hiddenGems.filter(hiddenGem => hiddenGem.types[0] === "cafe");
    }
  }

  updateShow(showType: string) {
    this.show = showType;
  }
}
