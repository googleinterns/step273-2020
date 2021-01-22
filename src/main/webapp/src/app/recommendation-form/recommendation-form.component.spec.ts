import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RecommendationFormComponent } from './recommendation-form.component';

describe('RecommendationFormComponent', () => {
  let component: RecommendationFormComponent;
  let fixture: ComponentFixture<RecommendationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationFormComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the recommendation form component', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    const fixture = TestBed.createComponent(RecommendationFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hidden Gems');
    expect(compiled.querySelector('h4').textContent).toContain('Get a restaurant recommendation tailored just for you!');
  });

  it('[Form Check] - Price Range', () => {
    const fixture = TestBed.createComponent(RecommendationFormComponent);
    let priceRange = component.preferenceForm.controls['price'];
    expect(priceRange.value).toEqual("");
    expect(priceRange.untouched).toBeTruthy();
    priceRange.setValue('low');
    component.onSubmit();
    expect(priceRange.errors).toBeNull();
    expect(priceRange.value).toEqual("low");
    expect(priceRange.valueChanges).toBeTruthy();
  });

  it('[Form Check] - Rating', () => {
    const fixture = TestBed.createComponent(RecommendationFormComponent);
    let starRating = component.preferenceForm.controls['rating'];
    expect(starRating.value).toEqual("");
    starRating.setValue('3');
    expect(starRating.valueChanges).toBeTruthy();
    starRating.setValue('4');
    component.onSubmit();
    expect(starRating.valid).toBeTruthy();
    expect(starRating.errors).toBeNull();
    expect(starRating.value).toEqual("4");
    expect(starRating.valueChanges).toBeTruthy();
  });

  it('[Form Check] - Restaurant Type', () => {
    const fixture = TestBed.createComponent(RecommendationFormComponent);
    let type = component.preferenceForm.controls['type'];
    expect(type.value).toEqual("");
    type.setValue('Cafe');
    component.onSubmit();
    expect(type.valid).toBeTruthy();
    expect(type.errors).toBeNull();
    expect(type.value).toEqual("Cafe");
    expect(type.valueChanges).toBeTruthy();
  });

  it('[Form Check] - Form Submitted', () => {

    spyOn(component, 'onSubmit');
    let btn = fixture.debugElement.query(By.css('#submit'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();

  });

  it('[Form Check] -  Form Populated', () => {

    component.preferenceForm.controls['price'].setValue("2");
    component.preferenceForm.controls['rating'].setValue("1");
    component.preferenceForm.controls['type'].setValue("Restaurant");

    component.onSubmit();
    expect(component.preferenceForm.controls['price'].value).toEqual('2');
    expect(component.preferenceForm.controls['rating'].value).toEqual('1');
    expect(component.preferenceForm.controls['type'].value).toEqual('Restaurant');

  });

});
