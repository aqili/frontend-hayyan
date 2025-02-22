import { Component, OnInit } from '@angular/core';

import { AuthService } from '@abp/ng.core';

import { OAuthService } from 'angular-oauth2-oidc';

import { Config } from 'src/environments/environment';

import { CustomAuthService } from '../../service/custom-auth.service';
import { NgIdleService } from '../service/ng-idle.service';

@Component({
  selector: 'app-user-idle',
  templateUrl: './user-idle.component.html',
  styleUrls: ['./user-idle.component.scss'],
})
export class UserIdleComponent implements OnInit {
  isModalOpen = false;
  inProgress: boolean;

  idleTimerLeft: string;
  secondTimerLeft: string;
  timeRemain: number;
  FULL_DASH_ARRAY = 283;

  constructor(private ngIdle: NgIdleService, private auth: CustomAuthService) {}

  ngOnInit(): void {
    if (this.auth.hasValidAccessToken()) {
      this.initTimer(Config.sessionTimeOut.sessionTimeMinute, Config.sessionTimeOut.sessionTimeAttentionMinute);
    }
  }

  /**
   * Draw timer circle
   */
  formatTimeLeft = (time: number) => {
    if (time > 0) {
      let seconds = Math.trunc(time / 1000);

      let min = 0;
      if (seconds >= 60) {
        min = Math.trunc(seconds / 60);
        console.log(min);
        seconds -= min * 60;
      }

      return `${min}:${seconds}`;
    }
  };

  initTimer(firstTimerValue: number, secondTimerValue: number): void {
    // Timer value initialization
    this.ngIdle.USER_IDLE_TIMER_VALUE_IN_MIN = firstTimerValue;
    this.ngIdle.FINAL_LEVEL_TIMER_VALUE_IN_MIN = secondTimerValue;
    // end

    // Watcher on timer
    this.ngIdle.initilizeSessionTimeout();
    this.ngIdle.userIdlenessChecker.subscribe((status: string) => {
      this.initiateFirstTimer(status);
    });

    this.ngIdle.secondLevelUserIdleChecker.subscribe((status: string) => {
      this.initiateSecondTimer(status);
    });
  }

  initiateFirstTimer = (status: string) => {
    switch (status) {
      case 'INITIATE_TIMER':
        break;

      case 'RESET_TIMER':
        break;

      case 'STOPPED_TIMER':
        this.showSendTimerDialog();
        break;

      default:
        this.idleTimerLeft = this.formatTimeLeft(Number(status));
        break;
    }
  };

  initiateSecondTimer = (status: string) => {
    switch (status) {
      case 'INITIATE_SECOND_TIMER':
        break;

      case 'SECOND_TIMER_STARTED':
        break;

      case 'SECOND_TIMER_STOPPED':
        this.logout();
        break;

      default:
        this.secondTimerLeft = status;
        break;
    }
  };

  showSendTimerDialog(): void {
    if (this.auth.hasValidAccessToken()) {
      this.isModalOpen = true;
      this.inProgress = true;
    }
  }

  continue(): void {
    this.isModalOpen = false;
    this.inProgress = false;
    // stop second timer and initiate first timer again
    NgIdleService.runSecondTimer = false;
    this.ngIdle.initilizeSessionTimeout();
  }

  logout(): void {
    this.isModalOpen = false;
    this.inProgress = false;
    // stop all timer and end the session
    NgIdleService.runTimer = false;
    NgIdleService.runSecondTimer = false;
    this.auth.logOut();
  }
}
