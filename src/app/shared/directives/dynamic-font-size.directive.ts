import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective implements AfterViewInit {

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

  private adjustFontSize() {
    const element = this.el.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    
    // Formula to calculate font size based on input size. Adjust as necessary.
    const fontSize = height/2

    element.style.fontSize = `${fontSize}px`;
  }
}