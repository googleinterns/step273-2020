import { Component, OnInit, Injectable } from '@angular/core';
import { HiddenGem } from './hidden-gem';
import { HiddenGemService } from './hidden-gem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({
providedIn: 'root'
})

export class AppComponent {
  title = 'Hidden Gems';
  hiddenGems! : HiddenGem[];

  constructor(private hiddenGemService: HiddenGemService) { }

  getHiddenGems() {
    return new Promise((resolve, reject) => {
      this.hiddenGemService.getRankedHiddenGems()
        .subscribe(hiddenGems => {
          this.hiddenGems = hiddenGems;
        })
    })
  }
}
