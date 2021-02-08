import { Component, Input, OnInit } from '@angular/core';
import { HiddenGem } from 'src/app/models/hidden-gem';

@Component({
  selector: 'app-ranking-item',
  templateUrl: './ranking-item.component.html',
  styleUrls: ['./ranking-item.component.css']
})

export class RankingItemComponent implements OnInit{
  @Input() hiddenGem = {} as HiddenGem;
  photoUrl!: string;

  ngOnInit() {
    if (this.hiddenGem.photos != null) {
      this.photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
        + this.hiddenGem.photos[0].photoReference
        + "&key=AIzaSyCBb8QQBQal9jDNl3ZG6f3bS6ROX2MtYIM";
    }
    else {
      this.photoUrl = "https://www.flaticon.com/svg/vstatic/svg/3716/3716538.svg?token=exp=1612753174~hmac=f38de8989e705031bdecb2da1464c379"
    }
  }
}
