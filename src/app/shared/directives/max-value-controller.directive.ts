import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[maxValueController], textarea[maxValueController]',
})
export class MaxValueDirective {
  @Input('maxValueController')  maxValue;
  onChange;
  onTouch;

  constructor(protected element: ElementRef, protected control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    let initialValue =Number( this.element.nativeElement.value);
    if (Number(event.data)) {
      let newDataPath;
      if ((event.data) === '.') {
        const newData = `0${Number(event.data)}0`;
        newDataPath = newData<this.maxValue;
      } else {
        newDataPath =Number(this.maxValue)>Number(event.data);
      }
      if (!newDataPath) {
        initialValue = (initialValue as any).replace(Number(event.data), '');
      }
    }
   let checkinitialValue =Number(initialValue)<Number(this.maxValue);
    this.element.nativeElement.value = checkinitialValue
      ? initialValue
      : this.maxValue;

    this.control.control.setValue(this.element.nativeElement.value);
    if (initialValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('focusout', ['$event']) onFocusOut(event) {
    this.control.control.setValue(this.element.nativeElement.value);
  }
}
