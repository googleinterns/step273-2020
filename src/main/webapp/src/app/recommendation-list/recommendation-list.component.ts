import { Component, OnInit, Input } from '@angular/core';
import { HiddenGemService } from '../hidden-gem.service';
import { HiddenGem } from '../models/hidden-gem';

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

