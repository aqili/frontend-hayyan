import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-datepicker-hijri',
  templateUrl: './datepicker-hijri.component.html',
})
export class DatepickerHijriComponent extends BaseComponent implements OnInit {
  maxDate = this.NgbCalendarHijri.getPrev(this.NgbCalendarHijri.getToday(), 'y', 10);
  @Output() selectDateOutput = new EventEmitter<any>();
  @Input() filedText = '';
  @Input() controlName = '';
  control: FormControl;
  public form: FormGroup;
  onDateSelectFn() {
    this.selectDateOutput.emit();
  }
  constructor(private controlContainer: ControlContainer) {
    super();
  }
  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.control = this.form.get(this.controlName) as FormControl;
  }
}
