import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module'

describe('NavBarComponent', () => {
 
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavBarComponent ],
      providers: [
        NavBarComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes)
      ],
    }),
    
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create a NavBar', () => {
    expect(component).toBeTruthy();
  });

  it('should go to recommendation url', async(() => {
    fixture.nativeElement.querySelector("#recommendation-navbar").click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/recommendation');
    });
  }));
  it('should go to home url', async(() => {
    fixture.nativeElement.querySelector("#home-navbar").click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/');
    });
  }));

  it('recommendation route should be rendered correctly', () => {
      let href = fixture.nativeElement.querySelector("#recommendation-navbar")
      .getAttribute('href');
    expect(href).toEqual('/recommendation');
  });
  it('home route should be rendered correctly', () => {
      let href = fixture.nativeElement.querySelector("#home-navbar")
      .getAttribute('href');
    expect(href).toEqual('/');
  });
})
