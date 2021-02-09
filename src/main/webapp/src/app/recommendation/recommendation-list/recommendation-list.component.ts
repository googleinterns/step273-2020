import { Component, OnInit, Input } from '@angular/core';
import { HiddenGemService } from 'src/app/hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements OnInit {

  @Input() hiddenGems: HiddenGem[] = [];

  constructor() {}

  ngOnInit() {}

}

