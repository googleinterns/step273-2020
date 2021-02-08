import { Component, OnInit } from '@angular/core';
import { HiddenGem } from 'src/app/hidden-gem';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css']
})
export class RankingListComponent implements OnInit {
  hiddenGems! : HiddenGem[];

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    this.getHiddenGems();
  }

  ngDoCheck() {
    this.hiddenGems = this.appComponent.hiddenGems;
  }

  async getHiddenGems() {
    return await this.appComponent.getHiddenGems();
  }
}
