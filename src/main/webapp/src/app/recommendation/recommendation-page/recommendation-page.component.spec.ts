import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecommendationPageComponent } from './recommendation-page.component';
import { HiddenGem } from 'src/app/models/hidden-gem';

describe('RecommendationPageComponent', () => {
  let component: RecommendationPageComponent;
  let fixture: ComponentFixture<RecommendationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only display recommendation form in initial state', () => {

    expect(component.formSubmitted).toBeFalse;
    spyOn(component, 'onFormSubmit');
    expect(component.onFormSubmit).not.toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('app-recommendation-form'))).toBeDefined;
    expect(fixture.debugElement.query(By.css('app-recommendation-list'))).toBeNull;

  });

  it('should display recommendation form and list after form submission', () => {
    expect(fixture.debugElement.query(By.css('app-recommendation-form'))).toBeTruthy;
    expect(fixture.debugElement.query(By.css('app-recommendation-list'))).toBeFalsy;

    const hiddenGems: HiddenGem[] = [];
    component.onFormSubmit(hiddenGems);
    fixture.detectChanges();
    expect(component.formSubmitted).toBeTrue;
    expect(component.hiddenGems).toEqual(hiddenGems)

    expect(fixture.debugElement.query(By.css('app-recommendation-form'))).toBeTruthy;
    expect(fixture.debugElement.query(By.css('app-recommendation-list'))).toBeTruthy;

  });
});
