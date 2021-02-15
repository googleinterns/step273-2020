import { Component, Input, OnInit } from '@angular/core';
import { HiddenGem } from '../../models/hidden-gem';


@Component({
  selector: 'app-recommendation-item',
  templateUrl: './recommendation-item.component.html',
  styleUrls: ['./recommendation-item.component.css']
})
export class RecommendationItemComponent implements OnInit{
  @Input() hiddenGem = {} as HiddenGem;
  photoUrl!: string;
  type!: string;

  ngOnInit() {
    if (this.hiddenGem.photoReference != null) {
      this.photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
        + this.hiddenGem.photoReference
        + "&key=AIzaSyCBb8QQBQal9jDNl3ZG6f3bS6ROX2MtYIM";
    }
    else {
      this.photoUrl = "https://www.flaticon.com/svg/vstatic/svg/3716/3716538.svg?token=exp=1612753174~hmac=f38de8989e705031bdecb2da1464c379"
    }

    // This prevent the tests from failing with "Cannot read property '0' of undefined"
    if (this.hiddenGem.types != null && this.hiddenGem.types[0] != null) {
      this.type = this.hiddenGem.types[0];
    }
  }
}
