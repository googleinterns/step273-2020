import { Component, Input } from '@angular/core';
import { HiddenGem } from 'src/app/hidden-gem';


@Component({
  selector: 'app-recommendation-item',
  templateUrl: './recommendation-item.component.html',
  styleUrls: ['./recommendation-item.component.css']
})
export class RecommendationItemComponent {
  @Input() hiddenGem = {} as HiddenGem;

}
