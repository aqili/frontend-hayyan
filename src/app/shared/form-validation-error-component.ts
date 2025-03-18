import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Validation, ValidationErrorComponent } from '@ngx-validate/core';

@Component({
  selector: 'abp-validation-error',
  template: `
    <div
      class="font-weight-bold font-italic px-1 invalid-feedback"
      *ngFor="let error of abpErrors; trackBy: trackByFn"
    >
      {{ error.message | abpLocalization: error.interpoliteParams }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ErrorComponentTest extends ValidationErrorComponent {
  get abpErrors(): any[] {
    if (!this.errors || !this.errors.length) return [];
    return this.errors.map(error => {
      if (!error.message) return error;
      const index = error.message.indexOf('[');
      if (index > -1) {
        var msg = {
          ...error,
          message: error.message.slice(0, index),
          interpoliteParams: error.message.slice(index + 1, error.message.length - 1).split(','),
        };
        /* if (error.key == 'max') {
          msg.interpoliteParams.filter(v=>v=='{{ min }}')[0].replace('{{ min }}','0')

        } */
        return msg;
      }
      return error;
    });
  }
}
