import { Component, Input } from '@angular/core';
import { HiddenGem } from 'src/app/hidden-gem';

@Component({
  selector: 'app-ranking-item',
  templateUrl: './ranking-item.component.html',
  styleUrls: ['./ranking-item.component.css']
})

export class RankingItemComponent {
  @Input() hiddenGem = {} as HiddenGem;
}
