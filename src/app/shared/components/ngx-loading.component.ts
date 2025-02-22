import {Input, Component, Renderer2, ElementRef, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'my-ngx-loading',
  template: `
    <div id="blocker" class="blocker" *ngIf="showIf">

    <div id="pause" class="d-flex align-items-center justify-content-center">
    <div id="spinner"></div>
  </div>
    </div>
    <ng-content class="content"></ng-content>
  `,
	styleUrls: ['loading.scss']
})
export class MyNgxLoadingComponent {
  @Input('showIf') showIf: boolean;
  diameter: number = 20;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}


  ngAfterViewInit() {
    // spinner block
    let blocker: any = this.el.nativeElement.querySelector('.blocker');

    // user element
    let firstChild: any = Array.from(this.el.nativeElement.children)
      .find(el => el !== blocker);

    if (firstChild) { //if text, this is null
      let firstChildStyle = window.getComputedStyle(firstChild);
      // if user element is a block, change this element to block
      if (firstChildStyle.display === 'block'&&this.el?.nativeElement) {
        this.el.nativeElement.style.display = 'block'
      };
      // if user element has borderRadius, make blocker the same
      if (firstChildStyle.borderRadius&&blocker) {
        blocker.style.borderRadius = firstChildStyle?.borderRadius;
      }
      // if the user element is big, change the spinner size bigger
      if (parseInt(firstChild?.style?.height) >= 200) {
        this.diameter = 40;
        this.changeDetector.detectChanges();
      }
    }
  }

}
