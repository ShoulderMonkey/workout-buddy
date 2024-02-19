import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMinSecFormatter]'
})
export class MinSecFormatterDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = this.el.nativeElement.value.replace(/[^0-9]/g, '');

    if (value.length === 3) {
      value = value.replace(/^(\d{2})(\d)$/, '$1:$2');
    } else if (value.length === 4) {
      value = value.replace(/^(\d{2})(\d{2})$/, '$1:$2');
    }

    // Splitting the minutes and seconds to check the seconds part
    const parts = value.split(':');
    if (parts.length === 2) {
      const seconds = parseInt(parts[1], 10);
      // Correct seconds if above 59
      if (seconds > 59) {
        parts[1] = '59';
        value = parts.join(':');
      }
    }

    this.el.nativeElement.value = value;
    event.preventDefault();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    const value = this.el.nativeElement.value;

    // Prevent more than 4 digits or non-numeric characters except backspace, delete, arrow keys
    if (value.replace(/[^0-9]/g, '').length >= 4 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault();
    }
  }
}
