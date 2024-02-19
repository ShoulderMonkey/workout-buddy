import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Flow, Routine } from 'src/app/model/flow';
import { DurationSelectorComponent } from './duration-selector/duration-selector.component';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-flow-create',
  templateUrl: './flow-create.component.html',
  styleUrls: ['./flow-create.component.scss']
})
export class FlowCreateComponent {

  form: FormGroup;
  isNew: boolean = false;
  flow?: Flow

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private config: ConfigService
  ) {

    this.form = fb.group({
      id: null,
      createdAt: null,
      description: null,
      routines: fb.array([])
    })

    route.data.subscribe({
      next: (data => {
        let flow = data['flow'] as Flow

        if (flow) {
          this.isNew = false

          this.form.patchValue({
            ...flow
          })
          flow.routines.forEach(routine => {
            this.addRoutine(routine)
          })
        } else {
          this.isNew = true
          this.form.patchValue({
            ...new Flow()
          })
        }
      })
    })

    this.form.valueChanges.subscribe(flow => {
      const flowValue = this.form.getRawValue()
      if(this.isNew){
        this.config.addFlow(flowValue)
        this.isNew = false
      }else{
        this.config.updateFlow(flowValue)
      }
    })
  }

  get routines() {
    return this.form.get('routines') as FormArray
  }

  get routinesGroup() {
    return (this.form.get('routines') as FormArray).controls as FormGroup[]
  }

  get newRoutine() {
    const newRoutineGroup = this.fb.group({
      description: undefined,
      imageSrc: undefined,
      durationInMs: undefined
    })
    newRoutineGroup.get('durationInMs')?.disable()
    newRoutineGroup.patchValue(new Routine())
    return newRoutineGroup
  }

  addRoutine(routine?: Routine) {
    if(routine){
      const formGroup = this.newRoutine
      formGroup.patchValue(routine)
      this.routines.push(formGroup)
    }else{
      this.routines.push(this.newRoutine)
    }
  }

  openEditDialog(formGroup: FormGroup) {
    this.dialog.open(DurationSelectorComponent,
      { data: 
        { initialValue: formGroup.get('durationInMs')?.value } 
      }).afterClosed().subscribe(res => {
        if (res !== undefined) {
          formGroup.get('durationInMs')?.setValue(res)
        }
      })
  }


}
