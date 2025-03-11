import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from '@base/base-modal.component';
import { DashboardModel, DashboardService } from '@proxy/dashboard';
import { ResponseData } from '@proxy/domain/shared/common';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    templateUrl: './statswidget.html'
})
export class StatsWidget extends BaseModalComponent implements OnInit {
     get Service(): DashboardService {
        return this.getByInjector(DashboardService);
      }
      dashboard: DashboardModel ;
    ngOnInit(): void {
        this.showIntervalLoader();
        debugger;
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
