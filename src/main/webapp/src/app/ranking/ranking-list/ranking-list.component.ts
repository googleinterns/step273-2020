import { Component, OnInit } from '@angular/core';
import { HiddenGemService } from '../../hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';
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

  constructor(private hiddenGemService: HiddenGemService, private locationService: LocationService) { }

  ngOnInit() {

    this.locationService.getLocation
      .subscribe(location => {
        this.location = location;
    })

    
    this.hiddenGemService.getAllHiddenGems()
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
    })
    console.log("list " + this.location.lat + "   " + this.location.lng);
  }

}
