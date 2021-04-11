import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrugDisposalRegistrationPage } from './drug-disposal-registration.page';

describe('DrugDisposalRegistrationPage', () => {
  let component: DrugDisposalRegistrationPage;
  let fixture: ComponentFixture<DrugDisposalRegistrationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDisposalRegistrationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrugDisposalRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
