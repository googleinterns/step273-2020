import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationService } from '../location.service';
import { Location } from 'src/app/models/location';
import { By } from '@angular/platform-browser';
import { LocationComponent } from './location.component';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationComponent ],
      imports: [ RouterTestingModule ],
      providers: [ LocationService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Hidden Gems!');
    expect(compiled.querySelector('h4').textContent).toContain
    ('To use Hidden Gems, please allow location services. If not possible select a default location [Sydney, Adelaide].');
  });

  it('should set the default location [Sydney]', () => {

    const sydneyLocation: Location = {
      lat: -33.8688,
      lng: 151.2093,
    };

    // trigger the click
    let sydneyBtn = fixture.debugElement.query(By.css('#sydneyButton')).nativeElement;
    sydneyBtn.click();
    fixture.detectChanges();

    expect(component.location).toEqual(sydneyLocation);
  });

  it('should set the default location [Adelaide]', () => {

    const adelaideLocation: Location = {
      lat: -34.9285,
      lng: 138.6007,
    };

    // trigger the click
    let adelaideBtn = fixture.debugElement.query(By.css('#adelaideButton')).nativeElement;
    adelaideBtn.click();
    fixture.detectChanges();

    expect(component.location).toEqual(adelaideLocation);
  });

  it('should set the users location [Geolocation] success', function() {

    expect(navigator.geolocation).toBeDefined;

    spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      var position = { coords: { latitude: 66.6666, longitude: -1.1111} };
      arguments[0](position);
    });

    // trigger the click
    let geolocationBtn = fixture.debugElement.query(By.css('#geolocationButton')).nativeElement;
    geolocationBtn.click();
    fixture.detectChanges();

   expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled;
   expect(component.location.lat).toEqual(66.6666);
   expect(component.location.lng).toEqual(-1.1111);

  });


  it('should set display error message [Geolocation] failure!', function() {

    spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      const error = "FAILED"
      arguments[1](error);
    });

    // trigger the click
    let geolocationBtn = fixture.debugElement.query(By.css('#geolocationButton')).nativeElement;
    geolocationBtn.click();
    fixture.detectChanges();

    expect(component.handleLocationError).toHaveBeenCalled;
    expect(component.setLocation).not.toHaveBeenCalled;
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Geolocation services have failed. Try a default location. User denied the request for Geolocation.');
  });

  it('should display the spinner only when fetching', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-spinner')).toBeNull;
    const button = fixture.debugElement.query(By.css('#geolocationButton')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(compiled.querySelector('mat-spinner').src).not.toBeNull;
  })
});
