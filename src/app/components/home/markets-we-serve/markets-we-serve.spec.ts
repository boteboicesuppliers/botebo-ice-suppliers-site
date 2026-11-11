import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsWeServe } from './markets-we-serve';

describe('MarketsWeServe', () => {
  let component: MarketsWeServe;
  let fixture: ComponentFixture<MarketsWeServe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketsWeServe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketsWeServe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
