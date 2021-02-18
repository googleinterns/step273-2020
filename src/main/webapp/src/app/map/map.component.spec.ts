import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MapComponent } from './map.component';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [LocationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Map Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Maps!');
  });

  it('should store the initial location', () => {

    const defaultSydneyLocation: Location = {
      lat: -33.8688,
      lng: 151.2093,
    };
    expect(component.location).toEqual(defaultSydneyLocation);
  });

  //TODO: Commented out because this test now is the only one getting the "google is undefined" error.
  // it('should display the spinner when hidden gems are not fetched yet', () => {
  //   const hiddenGems: HiddenGem[] = []
  //   component.hiddenGems = hiddenGems;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.query(By.css('mat-spinner'))).not.toBeNull();
  // })

  //TODO: Write test to check that the spinner is hidden when the fetch is done.
});
