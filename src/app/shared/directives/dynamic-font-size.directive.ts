import { Directive, HostListener, ElementRef, AfterViewInit, DoCheck } from '@angular/core';

@Directive({
  selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective implements AfterViewInit, DoCheck {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.adjustFontSize();
  }

  @HostListener('input')
  onInput() {
    this.adjustFontSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustFontSize();
  }

  ngDoCheck(): void {
      this.adjustFontSize()
  }

  private adjustFontSize() {
    const element = this.el.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    
    // Formula to calculate font size based on input size. Adjust as necessary.
    let fontSize = height/2
    if(fontSize === 0){
      fontSize = 1;
    }
    element.style.fontSize = `${fontSize}px`;
  }
}