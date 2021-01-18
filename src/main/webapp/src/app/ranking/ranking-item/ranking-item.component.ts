import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-item',
  templateUrl: './ranking-item.component.html',
  styleUrls: ['./ranking-item.component.css']
})
export class RankingItemComponent {
  @Input() hiddenGem : any
}
