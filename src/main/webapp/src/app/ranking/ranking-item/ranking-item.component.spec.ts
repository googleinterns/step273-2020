import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingItemComponent } from './ranking-item.component';
import { HiddenGem } from '../../models/hidden-gem';

describe('RankingItemComponent', () => {
  let component: RankingItemComponent;
  let fixture: ComponentFixture<RankingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hidden gem details', () => {
    const hiddenGem: HiddenGem = {
      geometry: {
        location: {lat: -33.8655823, lng: 151.2078192},
        viewport:{
          northeast: {lat: -33.8655823, lng: 151.2078192},
          southwest: {lat: -33.8655823, lng: 151.2078192}
        }
      },
      name: 'Fratelli Fresh',
      icon: '',
      placeId: '1',
      rating: 3.6,
      types: ['restaurant'],
      openingHours: {openNow: true},
      photos: [{
        photoReference: "photoReference",
        height: 0,
        width: 0,
        htmlAttributions: ["htmlAttributions"]}],
      vicinity: 'ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000',
      permanentlyClosed: false,
      userRatingsTotal: 30,
      businessStatus: ''
    };
    component.hiddenGem = hiddenGem;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#name').textContent).toBe('Fratelli Fresh');
    expect(compiled.querySelector('#address').textContent).toBe('ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000');
    expect(compiled.querySelector('img').src).toBeTruthy;
    expect(compiled.querySelector('#business_type').textContent).toBeTruthy;
    expect(compiled.querySelector('#number_of_reviews').textContent).toContain(30);
    expect(compiled.querySelector('#rating').textContent).toContain(3.6);
    expect(compiled.querySelector('#opening_hours').textContent).toContain('Open Now');
  });
});
