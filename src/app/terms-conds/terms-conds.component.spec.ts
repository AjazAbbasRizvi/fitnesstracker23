import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCondsComponent } from './terms-conds.component';

describe('TermsCondsComponent', () => {
  let component: TermsCondsComponent;
  let fixture: ComponentFixture<TermsCondsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsCondsComponent]
    });
    fixture = TestBed.createComponent(TermsCondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
