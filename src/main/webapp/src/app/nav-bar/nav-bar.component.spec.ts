import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
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

  it('should go to reccomendation url', () => {
    fixture.debugElement.query(By.css('a')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/recommendation');
      console.log('after expect');
    });
  });

  it('routes should be rendered correctly', () => {
      let href = fixture.debugElement.query(By.css('a')).nativeElement
      .getAttribute('href');
    expect(href).toEqual('/recommendation');
  });
})
