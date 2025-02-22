import { ConfigStateService } from '@abp/ng.core';

import { Injectable, OnInit } from '@angular/core';

import { NgbCalendarIslamicCivil, NgbDate, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendarHijri } from '@ng-bootstrap/ng-bootstrap/datepicker/hijri/ngb-calendar-hijri';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomNgbDatepickerConfig extends NgbDatepickerConfig {
minDate: NgbDateStruct={year:1800,month:1,day:1};

}

@Injectable({ providedIn: 'root' })
export class CustomNgbDatepickerHijriConfig extends NgbDatepickerConfig {
minDate: NgbDateStruct={year:1214,month:1,day:1};

}

@Injectable({ providedIn: 'root' })
export class CustomNgbDatepickerHijri extends NgbCalendarIslamicCivil {

}
