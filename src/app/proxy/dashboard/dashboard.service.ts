import type { DashboardModel } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseData } from '../domain/shared/common/models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiName = 'Default';
  

  getDashboard = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<DashboardModel>>({
      method: 'GET',
      url: '/api/app/dashboard/dashboard',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
