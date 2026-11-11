import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReach } from './business-reach';

describe('BusinessReach', () => {
  let component: BusinessReach;
  let fixture: ComponentFixture<BusinessReach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessReach]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessReach);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
