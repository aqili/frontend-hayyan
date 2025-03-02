import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '@base/base-modal.component';

import { AbpSetting } from 'src/app/core/abp-settings';

@Component({
  selector: 'app-deposite-modal',
  templateUrl: './deposite-modal.component.html',
  styleUrls: ['./deposite-modal.component.scss'],
})
export class DepositeModalComponent extends BaseModalComponent {
  get Service(): any {
    return null;
  }
  customerAccountNumber = this.getConfigService.getSettingByKey<string>(
    AbpSetting.CustomerAccountNumber
  );

  ngOnInit(): void {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.showIntervalLoader();
    /*  this.Service.getAccountIbanInfo(
    ).subscribe((res: ResponseData<AccountIbanInfoDto>) => {
      this.hideIntervalLoader();
      if (res.isValid) {
        this.data=res.data;
      } else {
        this.ToasterService.warn(res.firstErrorMessage);
      }
    }); */
  }
}
