import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-recommendation-item',
  templateUrl: './recommendation-item.component.html',
  styleUrls: ['./recommendation-item.component.css']
})
export class RecommendationItemComponent {
  @Input() hiddenGem: any = {}

}



