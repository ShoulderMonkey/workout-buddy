import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowEndDialogComponent } from './flow-end-dialog.component';

describe('FlowEndDialogComponent', () => {
  let component: FlowEndDialogComponent;
  let fixture: ComponentFixture<FlowEndDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowEndDialogComponent]
    });
    fixture = TestBed.createComponent(FlowEndDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
