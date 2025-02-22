import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { CustomValidator } from '@shared/service/form/form-validation';

@Component({
  selector: 'app-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
})
export class WithdrawModalComponent extends BaseModalComponent {
  get Service(): any {
    throw new Error('Method not implemented.');
  }

  /*   get LutService(): LUtService {
    return this.getByInjector(LUtService);
  } */
  walletamount;
  transAmount = 0;
  protected buildForm(): void {
    this.form = this.FormBuilder.group({
      amount: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.walletamount),
          CustomValidator.numberValidator,
        ],
      ],
      beneficiaryAccountId: [null, [Validators.required]],
    });
  }
  protected onEnterOnInit() {}
  trackById = (index, item) => item.id;

  /*   protected save(): Promise<ResponseData<boolean>> {

    return this.Service.bankTransferByBankTransfereDto(this.form.getRawValue()).toPromise();
  }

  onSubmitSuccess(res: ResponseData<any>) {
    this.transAmount = this.form.controls.amount.value;

    super.onSubmitSuccess(res);
    this.onCloseModel();
  } */
  protected beforeSave(): void {
    if (this.form.controls.amount.value > this.walletamount) {
      this.ToasterService.error('هذا المبلغ غير متاح حاليا');
    }
  }
}
