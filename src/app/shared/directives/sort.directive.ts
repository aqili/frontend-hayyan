import { ListService } from '@abp/ng.core';
import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { LoaderService } from '@shared/service/loader.service';
@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() list: ListService;
  @Input() filterDto: any;
  @Input() key: any;

  constructor(private targetElem: ElementRef, private loader: LoaderService) {}

  @HostListener('click')
  sortData() {
    // Get Reference Of Current Clicked Element
    const elem = this.targetElem.nativeElement;
    // Get In WHich Order list should be sorted by default it should be set to desc on element attribute
    const order = elem.getAttribute('data-order');
    if (order === 'desc') {
      elem.setAttribute('data-order', 'asc');
      elem.classList.add('fa-sort-up');
      elem.classList.remove('fa-sort-down');
      this.filterDto.sorting = this.key + ' DESC';
      this.loader.show();
      this.list.get();
    } else {
      elem.setAttribute('data-order', 'desc');
      elem.classList.remove('fa-sort-up');
      elem.classList.add('fa-sort-down');
      this.filterDto.sorting = this.key + ' ASC';
      this.loader.show();
      this.list.get();
    }
  }
}
