import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowCreateComponent } from './flow-create.component';

describe('FlowCreateComponent', () => {
  let component: FlowCreateComponent;
  let fixture: ComponentFixture<FlowCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowCreateComponent]
    });
    fixture = TestBed.createComponent(FlowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
