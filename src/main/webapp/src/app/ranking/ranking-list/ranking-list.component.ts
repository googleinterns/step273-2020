import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/models/location';


@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {

  hiddenGems = this.appComponent.hiddenGems;
  location = {} as Location;

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
    }
  }
}
