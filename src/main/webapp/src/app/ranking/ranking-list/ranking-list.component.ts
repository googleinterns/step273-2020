import { Component, OnInit } from '@angular/core';
import { HiddenGem } from 'src/app/hidden-gem';
import { AppComponent } from 'src/app/app.component';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/location';


@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  hiddenGems! : HiddenGem[];
  location = {} as Location;

  constructor(private locationService: LocationService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
      })
    this.getRankedHiddenGems();
  }

  ngDoCheck() {
    this.hiddenGems = this.appComponent.hiddenGems;
  }

  async getRankedHiddenGems() {
    return await this.appComponent.getRankedHiddenGems();
  }
}
