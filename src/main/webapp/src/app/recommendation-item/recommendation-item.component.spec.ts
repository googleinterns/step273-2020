import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationItemComponent } from './recommendation-item.component';
import { HiddenGem } from '../hidden-gem';

describe('RecommendationItemComponent', () => {
  let component: RecommendationItemComponent;
  let fixture: ComponentFixture<RecommendationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hidden gem details', () => {
    const hiddenGem: HiddenGem = {
      geometry: {},
      name: 'Fratelli Fresh',
      icon: '',
      placeId: '1',
      rating: 3.6,
      types: ['restaurant'],
      openingHours: {},
      photos: [{}],
      vicinity: 'ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000',
      permanentlyClosed: false,
      userRatingsTotal: 30,
      businessStatus: ''
    };

    component.hiddenGem = hiddenGem;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('img').src).toBe('https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg');
    expect(compiled.querySelector('#name').textContent).toBe('Fratelli Fresh');
    expect(compiled.querySelector('#address').textContent).toBe('ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000');
    // expect(compiled.querySelector('#price').textContent).toBe('Price Level (💲): 3');
    expect(compiled.querySelector('#rating').textContent).toBe('Star Rating (⭐️): 3.6');
  });
});
