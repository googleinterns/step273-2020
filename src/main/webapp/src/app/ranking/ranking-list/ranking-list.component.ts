import { Component, OnInit } from '@angular/core';
import { HiddenGemService } from '../../hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {
  hiddenGems! : HiddenGem[];

  constructor(private hiddenGemService: HiddenGemService) { }

  ngOnInit() {
    this.hiddenGemService.getRankedHiddenGems()
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
    })
  }

}
