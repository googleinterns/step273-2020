import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecommendationFormComponent } from './recommendation-form.component';

describe('RecommendationFormComponent', () => {
  let component: RecommendationFormComponent;
  let fixture: ComponentFixture<RecommendationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationFormComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hidden Gems');
    expect(compiled.querySelector('h4').textContent).toContain('Get a restaurant recommendation tailored just for you!');
  });

  it('[Form Check] - Price Range', () => {
    let priceRange = component.preferenceForm.controls['price'];
    expect(priceRange.value).toEqual("");
    priceRange.setValue('low');
    component.onSubmit();
    expect(priceRange.errors).toBeNull();
    expect(priceRange.value).toEqual("low");
    expect(priceRange.valueChanges).toBeTruthy();
  });

  it('[Form Check] - Rating', () => {
    let starRating = component.preferenceForm.controls['rating'];
    expect(starRating.untouched).toBeTrue;
    expect(starRating.valid).toBeFalse;

    starRating.setValue(3);
    component.onSubmit();

    expect(starRating.touched).toBeTrue;
    expect(starRating.valid).toBeTrue;
    expect(starRating.value).toEqual(3);

  });

  it('[Form Check] - Restaurant Type', () => {
    let type = component.preferenceForm.controls['type'];
    expect(type.value).toEqual("");
    expect(type.pristine).toBeTrue;
    type.setValue('Cafe');
    component.onSubmit();
    expect(type.pristine).toBeFalse;
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

  it('[Form Check] -  No Preference', () => {

    component.onSubmit();
    expect(component.preferenceForm.controls['price'].value).toEqual('');
    expect(component.preferenceForm.controls['rating'].value).toEqual('');
    expect(component.preferenceForm.controls['type'].value).toEqual('');

    expect(component.preferenceForm.status).toEqual("INVALID");
    expect(component.preferenceForm.touched).toBeFalse;
    expect(component.preferenceForm.pristine).toBeTrue;
  });
});
