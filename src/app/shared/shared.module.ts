import { CoreModule } from '@abp/ng.core';

import { NgModule } from '@angular/core';

import { ThemeSharedModule } from '@abp/ng.theme.shared';

import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VALIDATION_ERROR_TEMPLATE } from '@ngx-validate/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerConfig,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { NgxValidateCoreModule } from '@ngx-validate/core';

import { NgSelectModule } from '@ng-select/ng-select';

import { CountdownModule } from 'ngx-countdown';

import { ErrorComponentTest } from './form-validation-error-component';

import { MyNgxLoadingComponent } from './components/ngx-loading.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { HideMissingDirective } from './directives/handle-missing.directive';
import { KeyPatternControllerDirective } from './directives/key-pattern-controller.directive';
import { MaxValueDirective } from './directives/max-value-controller.directive';
import { MinValueDirective } from './directives/min-value-controller.directive';
import { NumberOnly } from './directives/numberOnly.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { SortDirective } from './directives/sort.directive';
import { CounterDirective } from './directives/timer.directive';
import { TwoDigitDecimalNumberDirective } from './directives/two-digit-decimal-number.directive';
import { KeysPipe } from './pipes/keys.pipe';
import { CustomNgbDatepickerConfig } from './service/custom-ngb-datepicker.service';
import { AddAttachmentComponent } from './components/add-attachment/add-attachment.component';
import { DatepickerHijriComponent } from './components/datepicker-hijri/datepicker-hijri.component';
import { DepositeModalComponent } from './components/deposite-modal/deposite-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OtpInputComponent } from './components/otp/angular-otp-input.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';
import { WithdrawModalComponent } from './components/withdraw-modal/withdraw-modal.component';
@NgModule({
  declarations: [
    NumbersOnlyDirective,
    MaxValueDirective,
    MinValueDirective,
    CopyClipboardDirective,
    KeyPatternControllerDirective,
    ErrorComponentTest,
    HeaderComponent,
    FooterComponent,
    OtpInputComponent,
    MyNgxLoadingComponent,
    WithdrawModalComponent,
    TwoDigitDecimalNumberDirective,
    DepositeModalComponent,
    AddAttachmentComponent,
    DatepickerHijriComponent,
    HideMissingDirective,
    SortDirective,
    KeysPipe,
    TableViewComponent,
    NumberOnly,
    CounterDirective,
    UploadExcelComponent,
  ],
  imports: [
    CoreModule,
    CountdownModule,
    NgSelectModule,
    ThemeSharedModule,
    NgbModule,
    NgbDropdownModule,
    NgbDatepickerModule, // add this line
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxValidateCoreModule,
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    MyNgxLoadingComponent,
    TableViewComponent,
    NgbDatepickerModule,
    CopyClipboardDirective,
    NgSelectModule,
    CountdownModule,
    CommonModule,
    UploadExcelComponent,
    DatepickerHijriComponent,
    NgbDropdownModule,
    HideMissingDirective,
    NgxValidateCoreModule,
    NumbersOnlyDirective,
    MaxValueDirective,
    OtpInputComponent,
    KeysPipe,
    NumberOnly,
    CounterDirective,
    KeyPatternControllerDirective,
    FormsModule,
    ReactiveFormsModule,
    MinValueDirective,
    HeaderComponent,
    FooterComponent,
    AddAttachmentComponent,
    NgbModule,
    TwoDigitDecimalNumberDirective,
    SortDirective,
  ],
  providers: [
    { provide: VALIDATION_ERROR_TEMPLATE, useValue: ErrorComponentTest },
    DecimalPipe,
    KeysPipe,
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: NgbDatepickerConfig, useClass: CustomNgbDatepickerConfig },
  ],
})
export class SharedModule {}
