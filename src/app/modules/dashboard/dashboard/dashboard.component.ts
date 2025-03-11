import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '@base/base-modal.component';
import { DashboardService } from '@proxy/dashboard';
import { DashboardModel } from '@proxy/dashboard/models';
import { ResponseData } from '@proxy/domain/shared/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  extends BaseModalComponent implements OnInit {
     get Service(): DashboardService {
        return this.getByInjector(DashboardService);
      }
      dashboard: DashboardModel = {
      courses:0,assingedExperiments:0,experiments:0,groups:0,students:0,instructors:0,userType:0
     };
    ngOnInit(): void {
        this.showIntervalLoader();
            this.Service.getDashboard(
            ).subscribe((arg: ResponseData<DashboardModel>) => {
              this.hideIntervalLoader();
        
              if (arg.isValid) {
                this.dashboard =arg.data;
              } else {
                this.ToasterService.error(arg.firstErrorMessage);
              }
            });
    }

}
