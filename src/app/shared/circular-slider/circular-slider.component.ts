import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { throttle } from 'lodash';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';


@Component({
  selector: 'app-circular-slider',
  templateUrl: './circular-slider.component.html',
  styleUrls: ['./circular-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CircularSliderComponent),
      multi: true
    }
  ]
})
export class CircularSliderComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, AfterViewChecked {
  @Input() min: number = 0; // Default minimum value
  @Input() max: number = 100; // Default maximum value
  @Input() allowNegative: boolean = false;
  private _value: number = 0;

  private rotations = 0;
  private previousAngle = 0; // Track the previous angle to detect full rotations

  private resizeSubscription?: Subscription;

  onChange: any = () => {};
  onTouched: any = () => {};
  disabled: boolean = false

  get value(): number {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  @ViewChild('sliderHandle') sliderHandle!: ElementRef;
  @ViewChild('svgRef') svgRef!: ElementRef<SVGElement>;
  handlePosition = { x: 150, y: 50 }; // Default position
   centerX = 150;
   centerY = 150;
   radius = 100;
  dragging = false;

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;
    this.setHandlePosition(event);
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.dragging = false;
  }

  // Inside your component
  ngOnInit() {
    this.onMouseMove = throttle(this.onMouseMove, 10);
  }

  ngAfterViewInit() {
    this.updateSliderDimensions();
    const resizeObservable = fromEvent(window, 'resize').pipe(debounceTime(100)); // Debounce for performance
    this.resizeSubscription = resizeObservable.subscribe(() => {
      this.updateSliderDimensions();
    });
  }

  ngAfterViewChecked(){
    this.updateSliderDimensions()
  }
  
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  startDragging(event: MouseEvent|TouchEvent) {  
    if(!this.disabled){ 
    this.dragging = true;
    event.preventDefault();
    this.setHandlePosition(event);
    }
  }

  private setHandlePosition(event: MouseEvent | TouchEvent) {
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else { // Handle touch events
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    const svgRect = this.svgRef.nativeElement.getBoundingClientRect();
    //this.updateSliderDimensions(); // Ensure dimensions are up-to-date

    const dx = clientX - (svgRect.left + svgRect.width / 2);
    const dy = clientY - (svgRect.top + svgRect.height / 2);

    let angle = Math.atan2(dy, dx);

    // Adjust so 0 is at the top and normalize angle to [0, 2π]
    angle = (angle + 2 * Math.PI + Math.PI / 2) % (2 * Math.PI);

    // Detect full rotations
    const angleDelta = angle - this.previousAngle;
    if (angleDelta > Math.PI) { // Moved backwards over the 0 point
        this.rotations -= 1;
    } else if (angleDelta < -Math.PI) { // Moved forwards over the 0 point
        this.rotations += 1;
    }
    this.previousAngle = angle;

      
    // Calculate and update the value, including rotations
    const normalizedAngle = angle / (2 * Math.PI);
    const baseValue = this.min + normalizedAngle * (this.max - this.min);
    let adjustedValue = baseValue + this.rotations * (this.max - this.min);
    
    if(!this.allowNegative && adjustedValue < 0){
      adjustedValue = 0
    }else{
      // Calculate handle position
      this.handlePosition.x = this.centerX + this.radius * Math.cos(angle - Math.PI / 2);
      this.handlePosition.y = this.centerY + this.radius * Math.sin(angle - Math.PI / 2);
    }

    this.value = adjustedValue; // Update the slider's value

   
}


  private updateHandlePosition(angle: number): void {
    // Assuming centerX and centerY are the center of your slider
    
    const handleX = this.centerX + this.radius * Math.cos(angle);
    const handleY = this.centerY + this.radius * Math.sin(angle);
  
    // Assuming you have methods or properties to update the handle's position in your component
    this.handlePosition.x = handleX;
    this.handlePosition.y = handleY;

    // Update the component view, if necessary
    // This could involve directly manipulating the DOM, updating properties bound to your template, etc.
  }

  private updateSliderDimensions() {
    const svgRect = this.svgRef.nativeElement.getBoundingClientRect();
    this.centerX = svgRect.width / 2;
    this.centerY = svgRect.height / 2;
    // Assuming you want the radius to be half of the smallest dimension, minus some margin
    this.radius = Math.min(this.centerX, this.centerY) * 0.8; // Adjust the margin as needed


    this.writeValue(this._value)
    
  }
  

  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this._value = value;
      // Calculate rotations based on the value set
      this.rotations = Math.floor(value / (this.max - this.min));
      const effectiveValue = value % (this.max - this.min);
  
      // Convert the effective value back to an angle for handle positioning
      const normalizedValue = (effectiveValue - this.min) / (this.max - this.min);
      const angle = normalizedValue * 2 * Math.PI - Math.PI / 2; // Adjust for top start
      
      // Update handle position to match the value
      this.updateHandlePosition(angle);
    }
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
