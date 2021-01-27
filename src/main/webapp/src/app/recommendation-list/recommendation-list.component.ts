import { Component, OnInit } from '@angular/core';
import { HiddenGemService } from '../hidden-gem.service';
import { HiddenGem } from '../hidden-gem';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements OnInit {

  hiddenGems: HiddenGem[] = [];
  constructor(private hiddenGemService: HiddenGemService) { }

  ngOnInit() {
    this.hiddenGemService.top3gems$
      .subscribe(hiddenGems => {
        this.hiddenGems = hiddenGems;
      })
  }

}

