import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MapComponent } from './map.component';
import "./google.maps.mock";

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: MapsAPILoader, useValue: { load() { return new Promise((resolve) => resolve()); } } },
      ],
    }).compileComponents();
  }));
  

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

   it("should init map", () => {
    component.mapInitializer();
    //check that the object of google.maps.Map is generated 
    expect(component.mapEl).toBeTruthy();
    //check that a mock object 
    const mock: any = component.mapEl;
    expect(mock.verifyMock).toBe(true);
  });
});
 