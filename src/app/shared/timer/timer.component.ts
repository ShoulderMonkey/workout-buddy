import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements AfterViewInit{
  @Input() initialValue: number = 0
  @Input() updatingInterval: number = 100
  @Output() timerCompleted: EventEmitter<any> = new EventEmitter();

  value!: number
  control: FormControl = new FormControl()

  intervalId: any
  constructor(){
    
  }

  ngAfterViewInit(): void {
    /* this.control.valueChanges.subscribe(value => {
      console.log('control new value', value);
      this.value = value
    }) */
    this.value = this.initialValue
    this.control.disable()
    console.log(this.initialValue);
  }

  onInputValueChange(value: number) {
    this.control.setValue(value)
  }

  // Function to be called every millisecond to update the timer

  startTimer(){
      const updateTimer = () => {
        this.value -= 1000; // decrement by 1000 milliseconds (1 second)
        if (this.value <= 0) {
          this.value = 0
          console.log("Timer ended.");
          clearInterval(this.intervalId);
          this.timerCompleted.emit('Timer has completed!'); // Emit the completion event
        }
      };
  
      // Start the timer
      this.intervalId = setInterval(updateTimer, 1000);
  
      // Optionally, return a function to stop the timer
      return () => clearInterval(this.intervalId);
    }

    stopTimer(){
      clearInterval(this.intervalId)
    }
// Call the update function every 1000 milliseconds (1 second)
}
