import { Component, OnInit } from '@angular/core';
import { HiddenGemService, HiddenGem } from '../../hidden-gem.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {
  hiddenGems : any;

  constructor(private hiddenGemService: HiddenGemService) { }

  ngOnInit() {
    this.hiddenGemService.getAllHiddenGems()
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
    })
  }

}
