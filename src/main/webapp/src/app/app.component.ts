import { Component, OnInit } from '@angular/core';
import { HiddenGemService } from './hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Hidden Gems';
  hiddenGems! : HiddenGem[];

  constructor(private hiddenGemService: HiddenGemService) { }

  ngOnInit() {
    this.hiddenGemService.getRankedHiddenGems()
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
    })
  }

  getHiddenGems() {
    return this.hiddenGems;
  }
}
