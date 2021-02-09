import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RankingListComponent } from './ranking-list.component';
import { HiddenGemService } from '../../hidden-gem.service';
import { HiddenGem } from '../../models/hidden-gem';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/models/location';

describe('RankingListComponent', () => {
  let component: RankingListComponent;
  let fixture: ComponentFixture<RankingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HiddenGemService,
        LocationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO:think about how to test only after the promise/async call is finished
  // it('should display only 10 hidden gems', () => {
  //   const hiddenGems = new Array<HiddenGem>(20);
  //   component.hiddenGems = hiddenGems;
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelectorAll('app-ranking-item').length).toEqual(10);
  // })

  it('should store the initial location', () => {

    const defaultSydneyLocation: Location = {
      lat: -33.8688,
      lng: 151.2093,
    };
    expect(component.location).toEqual(defaultSydneyLocation);
  });
})
