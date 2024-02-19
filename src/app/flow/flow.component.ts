import { Component, ViewChild } from '@angular/core';
import { TimerComponent } from '../shared/timer/timer.component';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent {
  @ViewChild(TimerComponent)timer!: TimerComponent

  start(){
    this.timer.startTimer()
  }

  onTimerCompleted(event: any){

  }
}
