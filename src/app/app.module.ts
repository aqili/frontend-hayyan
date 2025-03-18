import { CoreModule, ListService, provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';
import {
  provideSettingManagementConfig,
  SettingManagementConfigModule,
} from '@abp/ng.setting-management/config';
import { provideFeatureManagementConfig } from '@abp/ng.feature-management';
import {
  DEFAULT_VALIDATION_BLUEPRINTS,
  ThemeSharedModule,
  ToasterService,
  provideAbpThemeShared,
} from '@abp/ng.theme.shared';
import { provideIdentityConfig } from '@abp/ng.identity/config';
import { provideAccountConfig } from '@abp/ng.account/config';
import { registerLocale } from '@abp/ng.core/locale';
import { ThemeLeptonXModule } from '@abp/ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@abp/ng.theme.lepton-x/layouts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { VALIDATION_ERROR_TEMPLATE } from '@ngx-validate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { VALIDATION_BLUEPRINTS } from '@ngx-validate/core';

import Aura from '@primeng/themes/aura';

import { NgxLoadingModule } from 'ngx-loading';

import { LoggerModule, NGXLogger } from 'ngx-logger';

import { providePrimeNG } from 'primeng/config';

import { environment, Config } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';

import { ErrorComponentTest } from './shared/form-validation-error-component';
import { SharedModule } from './shared/shared.module';
import { AnonymousLayoutComponent } from './layouts/anonymous-layout/anonymous-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/authlayout.component';
import { ErrorCatchingInterceptor } from './shared/interceptors/error-catching.interceptor';
import { MyHttpInterceptor } from './shared/interceptors/http.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { LoaderService } from './shared/service/loader.service';
import { UserIdleComponent } from './shared/user-idle-manager/user-idle/user-idle.component';

@NgModule({
  declarations: [AppComponent, UserIdleComponent, AuthLayoutComponent, AnonymousLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeSharedModule,
    ThemeLeptonXModule.forRoot(),
    SideMenuLayoutModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LoggerModule.forRoot({
      level: Config.loggerConfig.level,
      serverLogLevel: Config.loggerConfig.serverLogLevel,
      enableSourceMaps: Config.loggerConfig.enableSourceMaps,
    }),
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    NgbModule,
    ThemeSharedModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    NgxLoadingModule.forRoot({}),
  ],
  providers: [
    APP_ROUTE_PROVIDER,
    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: registerLocale(),
      }),
    ),
    provideAbpOAuth(),

    provideAbpThemeShared(),
    ListService,
    { provide: VALIDATION_ERROR_TEMPLATE, useValue: ErrorComponentTest },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      deps: [LoaderService, NGXLogger],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      deps: [LoaderService, NGXLogger, ToasterService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: VALIDATION_BLUEPRINTS,
      useValue: {
        ...DEFAULT_VALIDATION_BLUEPRINTS,
        validatePhoneNumber: '::invalidPhoneNumber',
        invalidEnglishAndNumberOnly: 'يجب ان يكون الحقل حروف انجليزيه وارقام فقط',
        invalidEnglishAndSpaceOnly: 'يجب ان يكون الحقل حروف انجليزيه فقط',
        invalidNumber: 'الرقم غير صحيح',
        startDatebeforeEndDate: 'Start date must be before end date',
      },
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
