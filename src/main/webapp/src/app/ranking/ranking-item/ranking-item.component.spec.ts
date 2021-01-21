import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingItemComponent } from './ranking-item.component';
import { HiddenGem } from '../../hidden-gem';

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
    const fixture = TestBed.createComponent(RankingItemComponent);
    const component = fixture.componentInstance;
    const hiddenGem: HiddenGem = {
      id: 1,
      name: 'Fratelli Fresh',
      business_type: 'restaurant',
      address: 'ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000',
      price_level: 2,
      rating: 3.6,
      photo: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg'
    };
    component.hiddenGem = hiddenGem;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img').src).toContain('https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg');
    expect(compiled.querySelector('#name').textContent).toContain('Fratelli Fresh');
    expect(compiled.querySelector('#business_type').textContent).toContain('restaurant');
    expect(compiled.querySelector('#address').textContent).toContain('ICC Sydney, tenancy 2/14 Darling Dr, Sydney NSW 2000');
    expect(compiled.querySelector('#price_level').textContent).toContain(2);
    expect(compiled.querySelector('#rating').textContent).toContain(3.6);
  });
});
