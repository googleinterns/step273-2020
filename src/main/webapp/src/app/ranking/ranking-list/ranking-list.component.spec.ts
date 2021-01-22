import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RankingListComponent } from './ranking-list.component';
import { HiddenGemService } from '../../hidden-gem.service';
import { HiddenGem } from '../../hidden-gem';

describe('HiddenGemService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HiddenGemService]
  }));

    it('should be created', () => {
    const service: HiddenGemService = TestBed.get(HiddenGemService);
    expect(service).toBeTruthy();
    });

    it('should have getAllHiddenGems function', () => {
    const service: HiddenGemService = TestBed.get(HiddenGemService);
    expect(service.getAllHiddenGems).toBeTruthy();
    });
});

//TODO:get rid of the HTTP client problem by,maybe,having the first describe go first, then the second one? Or include the service in the test, or combine
describe('RankingListComponent', () => {
  let component: RankingListComponent;
  let fixture: ComponentFixture<RankingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingListComponent ],
      imports: [HttpClientTestingModule],
      providers: [HiddenGemService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display only 10 hidden gems', () => {
    const fixture = TestBed.createComponent(RankingListComponent);
    const component = fixture.componentInstance;
    const hiddenGems = new Array<HiddenGem>(20);
    component.hiddenGems = hiddenGems;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-ranking-item').length).toEqual(10);
  })
})
