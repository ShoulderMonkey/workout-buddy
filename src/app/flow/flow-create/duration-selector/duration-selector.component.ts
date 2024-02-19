import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-duration-selector',
  templateUrl: './duration-selector.component.html',
  styleUrls: ['./duration-selector.component.scss']
})
export class DurationSelectorComponent {
  @Input() initialValue = 0

  value: number = this.initialValue
  control: FormControl = new FormControl(this.initialValue)

  constructor(
    public dialogRef: MatDialogRef<DurationSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { initialValue: number },
  ) {

    this.control.valueChanges.subscribe(value => {
      console.log('control new value', value);
      this.value = value
    })
    if (data) {
      this.control.setValue(this.data.initialValue)
    }
  }

  onInputValueChange(value: number) {
    this.control.setValue(value)
  }

  confirm(ok: boolean) {
    if (ok) {
      this.dialogRef.close(this.value)
    } else {
      this.dialogRef.close()
    }
  }
}
