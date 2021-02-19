import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationService } from '../../location.service';
import { Location } from 'src/app/models/location';
import { FormGroup} from '@angular/forms';
import { RecommendationFormComponent } from './recommendation-form.component';
import { HiddenGem } from 'src/app/models/hidden-gem';

describe('RecommendationFormComponent', () => {
  let component: RecommendationFormComponent;
  let fixture: ComponentFixture<RecommendationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationFormComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: []
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

  it('should set price button correctly ', () => {
    let priceRange = component.preferenceForm.controls['price'];
    expect(priceRange.value).toEqual("");
    priceRange.setValue('1');
    component.onSubmit();
    expect(priceRange.errors).toBeNull();
    expect(priceRange.value).toEqual("1");
    expect(priceRange.valueChanges).toBeTruthy();
  });

  it('should set rating button correctly ', () => {
    let starRating = component.preferenceForm.controls['rating'];
    expect(starRating.untouched).toBeTrue;
    expect(starRating.valid).toBeFalse;

    starRating.setValue(3);
    component.onSubmit();

    expect(starRating.touched).toBeTrue;
    expect(starRating.valid).toBeTrue;
    expect(starRating.value).toEqual(3);

  });

  it('should set restaurant type button correctly ', () => {
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

  it('should initially have no user preferences selected and disabled form submissison', () => {

    expect(component.preferenceForm.controls['price'].value).toEqual('');
    expect(component.preferenceForm.controls['rating'].value).toEqual('');
    expect(component.preferenceForm.controls['type'].value).toEqual('');

    expect(component.preferenceForm.status).toEqual("INVALID");

    let submitBtn = fixture.debugElement.query(By.css('#submit')).nativeElement;
    expect(submitBtn.disabled).toBeTrue;
    expect(component.preferenceForm.touched).toBeFalse;

  });

  it('should allow form submission once form is populated', () => {

    component.preferenceForm.controls['price'].setValue("2");
    component.preferenceForm.controls['rating'].setValue("1");
    component.preferenceForm.controls['type'].setValue("Restaurant");

    expect(component.preferenceForm.status).toEqual("VALID");
    let submitBtn = fixture.debugElement.query(By.css('#submit')).nativeElement;
    expect(submitBtn.disabled).toBeFalse;

    submitBtn.click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled;

    expect(component.preferenceForm.controls['price'].value).toEqual('2');
    expect(component.preferenceForm.controls['rating'].value).toEqual('1');
    expect(component.preferenceForm.controls['type'].value).toEqual('Restaurant');

  });

  // TODO after demo
  // Test filter function sorts list in decreasing matchscore
  // Test recommendationGems is shuffled
  // Test filter function sorts list in decreasing matchscore
  // Test result from filter function has length three
  // Test an empty set of hidden gems triggers the error message

  it('Test an empty set of hidden gems triggers the error message ', () => {
    const hiddenGems: HiddenGem[] = [];
    component.hiddenGems = hiddenGems;
    fixture.detectChanges();
    //Build preference form
    const preferenceForm = new FormGroup({
      price: new FormControl(1),
      rating: new FormControl(5),
      type: new FormControl('restaurant')
    });
    const compiled = fixture.nativeElement;
    expect((component.filterGems(hiddenGems, preferenceForm)).length).toEqual(0);
    expect(compiled.querySelector('#formErrorMessage').textContent).toBe('Sorry there are no hidden gems matching your preferences');
  })
});
