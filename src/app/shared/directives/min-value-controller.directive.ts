import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[minValueController], textarea[minValueController]',
})
export class MinValueDirective {
  @Input('minValueController') minValue;
  onChange;
  onTouch;

  constructor(protected element: ElementRef, protected control: NgControl) {}

  @HostListener('blur', ['$event']) onInputChange(event) {
    let initialValue = this.element.nativeElement.value;

    if (Number(event.data)) {
      let newDataPath;
      if (event.data === '.') {
        const newData = `0${Number(event.data)}0`;
        newDataPath = newData > this.minValue;
      } else {
        newDataPath = this.minValue < Number(initialValue);
      }
      if (!newDataPath) {
        initialValue = initialValue.replace(Number(event.data), '');
      }
    }
    let checkinitialValue = Number(initialValue) > Number(this.minValue);
    this.element.nativeElement.value = checkinitialValue ? initialValue : this.minValue;

    this.control.control.setValue(this.element.nativeElement.value);
    if (initialValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('focusout', ['$event']) onFocusOut(event) {
    this.control.control.setValue(this.element.nativeElement.value);
  }
}
