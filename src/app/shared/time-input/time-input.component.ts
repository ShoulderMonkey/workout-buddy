import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ]
})
export class TimeInputComponent implements ControlValueAccessor {
  
  private _value: number = 0;
  stringNumber: string = '00:00'

  disabled: boolean = false

  get value(){
    return this.stringNumber
  }

  set value(val: string) {
    this.stringNumber = val;
    this._value = this.convertStringMMSSToMs(val)
    this.onChange(this._value);
    this.onTouched();
  }



  onChange: any = () => {};
  onTouched: any = () => {};
  
  
  private convertStringMMSSToMs(string: string): number {
    const [minutes, seconds] = string.split(':').map(Number); // Convert both minutes and seconds to numbers
    return minutes * 60000 + seconds * 1000; // Convert minutes to milliseconds and add seconds converted to milliseconds
  }

  private convertMsToStringMMSS(ms: number): string {
    let minutes = Math.floor(ms / 60000); // Get total minutes
    let seconds = Math.floor((ms % 60000) / 1000); // Get remaining seconds
    // Format minutes and seconds to ensure they are always two digits
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    return `${minutesStr}:${secondsStr}`;
  }

  //ControlValueAccessor
  writeValue(value: number): void {    
    this._value = value;
    this.value = this.convertMsToStringMMSS(value)
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement this if your component needs to handle being disabled
    this.disabled = isDisabled
  }
}
