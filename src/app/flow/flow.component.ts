import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimerComponent } from '../shared/timer/timer.component';
import { ActivatedRoute } from '@angular/router';
import { Flow, Routine } from '../model/flow';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements AfterViewInit {
  @ViewChildren(TimerComponent)timers!: QueryList<TimerComponent>
  isCounting: boolean = false

  flow?: Flow
  currentRoutineIndex: number = 0
  currentTimer:any
  constructor(
    private route: ActivatedRoute
  ){
    route.data.subscribe({
      next: (data => {
        let flow = data['flow'] as Flow

        if (flow) {
          this.flow = flow
          //load correctly
        } else {
          //load error message
        }
      })
    })
  }

  ngAfterViewInit(): void {
      this.currentTimer = this.timers.get(this.currentRoutineIndex)
  }

  start(){
    this.isCounting = true
    this.currentTimer.startTimer()
  }

  pause(){
    this.isCounting = false
    this.currentTimer.stopTimer()
  }

  stop(){
    this.isCounting = false
    this.currentTimer.stopTimer()
    this.currentTimer.ngAfterViewInit()
  }

  getCardClass(i: number){
    if(i === this.currentRoutineIndex){
      return 'current';
    }else if(i === this.currentRoutineIndex +1){
      return 'next';
    }else if(i === this.currentRoutineIndex -1){
      return 'previous';
    }else{
      return 'hidden';
    }
  }

  onTimerCompleted(event: any){
    this.currentRoutineIndex++;
    this.currentTimer = this.timers.get(this.currentRoutineIndex)
    this.currentTimer.startTimer()
    //this.currentTimer.ngAfterViewInit()
  }
}
