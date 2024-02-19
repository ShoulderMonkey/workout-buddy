import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationSelectorComponent } from './duration-selector.component';

describe('DurationSelectorComponent', () => {
  let component: DurationSelectorComponent;
  let fixture: ComponentFixture<DurationSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DurationSelectorComponent]
    });
    fixture = TestBed.createComponent(DurationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
