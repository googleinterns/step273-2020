import { Component, OnInit, Injectable } from '@angular/core';
import { HiddenGem } from './models/hidden-gem';
import { HiddenGemService } from './hidden-gem.service';

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

  constructor(private hiddenGemService: HiddenGemService) { }

  ngOnInit() {
    this.getRankedHiddenGems();
  }

  getRankedHiddenGems() {
    return new Promise((resolve, reject) => {
      this.hiddenGemService.getRankedHiddenGems()
        .subscribe(hiddenGems => {
          this.hiddenGems = hiddenGems;
        })
    })
  }
}
