import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appHideMissing]',
})
export class HideMissingDirective {
  constructor(private el: HTMLImageElement) {
    alert('gfjgjh');
  }

  @HostListener('error')
  private onError() {
    this.el.src = './assets/img/Makassb-bannar.png';
  }
}
