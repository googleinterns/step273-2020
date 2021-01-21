import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MapComponent } from '../map/map.component';

describe('NavBarComponent', () => {
 
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  
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
        RouterTestingModule.withRoutes([
         { path: '', component: MapComponent }
        ])
      ],
    }),
    
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a NavBar', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home url',
    inject([Router, Location], (router: Router, location: Location)=> {
    let fixture = TestBed.createComponent(NavBarComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css('a')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/');
      console.log('after expect');
    });
  }));

  it('routes should be rendered correctly', 
    inject([Router, Location], (router: Router, location: Location)=> {
      let href = fixture.debugElement.query(By.css('a')).nativeElement
      .getAttribute('href');
    expect(href).toEqual('/recommendation');
  }));
})
