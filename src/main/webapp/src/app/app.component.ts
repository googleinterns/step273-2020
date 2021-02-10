import { Component, OnInit, Injectable } from '@angular/core';
import { HiddenGem } from './models/hidden-gem';
import { HiddenGemService } from './hidden-gem.service';
import { LocationService } from './location.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({
providedIn: 'root'
})

export class AppComponent implements OnInit{
  title = 'Hidden Gems';
  hiddenGems! : HiddenGem[];
  location = {} as Location;

  constructor(private hiddenGemService: HiddenGemService, private locationService: LocationService) {
    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
      })
  }

  ngOnInit() {
    this.getRankedHiddenGems();
  }

  getRankedHiddenGems() {
    return new Promise((resolve, reject) => {
      this.hiddenGemService.getRankedHiddenGems(this.location)
        .subscribe(hiddenGems => {
          this.hiddenGems = hiddenGems;
        })
    })
  }
}
