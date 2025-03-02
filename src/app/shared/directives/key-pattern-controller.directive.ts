import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[keyPatternController], textarea[keyPatternController]',
})
export class KeyPatternControllerDirective {
  @Input() protected pattern;
  onChange;
  onTouch;

  constructor(protected element: ElementRef, protected control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    let initialValue = this.element.nativeElement.value;
    if (event.data) {
      let newDataPath;
      if (event.data === '.') {
        const newData = `0${event.data}0`;
        newDataPath = newData.match(this.pattern);
      } else {
        newDataPath = event.data.match(this.pattern);
      }
      if (!newDataPath) {
        initialValue = initialValue.replace(event.data, '');
      }
    }
    initialValue = initialValue.match(this.pattern);
    this.element.nativeElement.value = Array.isArray(initialValue)
      ? initialValue[0]
      : '';

    this.control.control.setValue(this.element.nativeElement.value);
    if (initialValue !== this.element.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('focusout', ['$event']) onFocusOut(event) {
    this.control?.control?.setValue(this.element.nativeElement.value);
  }
}
