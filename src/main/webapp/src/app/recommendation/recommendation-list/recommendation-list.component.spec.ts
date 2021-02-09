import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationListComponent } from './recommendation-list.component';
import { HiddenGemService } from 'src/app/hidden-gem.service';
import { HiddenGem } from 'src/app/hidden-gem';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RecommendationListComponent', () => {
  let component: RecommendationListComponent;
  let fixture: ComponentFixture<RecommendationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationListComponent ],
      imports: [HttpClientTestingModule],
      providers: [HiddenGemService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display top 3 gems', () => {
    const hiddenGems = new Array<HiddenGem>(20);
    component.hiddenGems = hiddenGems;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-recommendation-item').length).toEqual(3);
  })
});
