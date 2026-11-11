import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormHomePage } from './contact-form-home-page';

describe('ContactFormHomePage', () => {
  let component: ContactFormHomePage;
  let fixture: ComponentFixture<ContactFormHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormHomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
