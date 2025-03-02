import { Component, Injectable } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDatepickerI18n,
  NgbDateAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { LocalizationParam, LocalizationService } from '@abp/ng.core';
import { Shell } from '@shared/shell';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const WEEKDAYSEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MONTHS = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];
const MONTHSEn = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Akhir',
  'Jumada al-Ula',
  'Jumada al-Akhirah',
  'Rajab',
  'Shaaban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qadah',
  'Dhu al-Ḥijjah',
];
@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  get IsArabic(): boolean {
    return this.LocalizationService.currentLang == 'ar';
  }
  get LocalizationService(): LocalizationService {
    return Shell.injector.get(LocalizationService);
  }
  getMonthShortName(month: number) {
    return this.IsArabic? MONTHS[month - 1]:MONTHSEn[month - 1];
  }

  getMonthFullName(month: number) {
    return this.IsArabic? MONTHS[month - 1]:MONTHSEn[month - 1];
  }

  getWeekdayLabel(weekday: number) {
    return this.IsArabic? WEEKDAYS[weekday - 1]: WEEKDAYSEn[weekday - 1];

  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
@Injectable()
export class NgbStringAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    return date
      ? {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }
      : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}
