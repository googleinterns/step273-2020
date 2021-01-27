import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecommendationComponent } from './recommendation.component';

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only display recommendation form in initial state', () => {

    spyOn(component, 'onFormSubmit');
    expect(component.onFormSubmit).not.toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('app-recommendation-form'))).toBeDefined;
    expect(fixture.debugElement.query(By.css('app-recommendation-list'))).toBeNull;
    
  });

  it('should display recommendation form and list after form submission', () => {
    expect(fixture.debugElement.query(By.css('app-recommendation-form'))).toBeTruthy;
    expect(fixture.debugElement.query(By.css('app-recommendation-list'))).toBeFalsy;
    
    spyOn(component, 'onFormSubmit');
    component.onFormSubmit();
    fixture.detectChanges();
    expect(component.onFormSubmit).toHaveBeenCalled();

    expect(fixture.debugElement.query(By.css('app-recommendation-form'))).toBeTruthy;
    expect(fixture.debugElement.query(By.css('app-recommendation-list'))).toBeTruthy;

  });
});
