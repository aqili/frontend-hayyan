import type { ResponseData } from './domain/shared/common/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  apiName = 'Default';
  

  sendOTPByMobileNumber = (mobileNumber: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: '/api/app/otp/send-oTP',
      params: { mobileNumber },
    },
    { apiName: this.apiName,...config });
  

  verifyOTPByMobileNumberAndConfirmationCode = (mobileNumber: string, ConfirmationCode: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: '/api/app/otp/verify-oTP',
      params: { mobileNumber, confirmationCode: ConfirmationCode },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
