import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RankingListComponent } from './ranking-list.component';
import { HiddenGemService } from '../../hidden-gem.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/models/location';
import { HiddenGem } from 'src/app/models/hidden-gem';
import { By } from '@angular/platform-browser';

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

  it('should display the spinner when hidden gems are not fetched yet', () => {
    const hiddenGems: HiddenGem[] = []
    component.hiddenGems = hiddenGems;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-spinner'))).not.toBeNull();
  })

  //TODO: Write test to check that the spinner is hidden when the fetch is done.
  //Attempt: try to push a hidden gem to the array and check for toBeNull()
  // But got error: 'Expected DebugElement__POST_R3__({ nativeNode: <mat-spinner _ngcontent-a-c53> }) to be null.'
})
