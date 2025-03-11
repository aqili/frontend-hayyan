import { Environment } from '@abp/ng.core';

import { INGXLoggerConfig, NgxLoggerLevel } from 'ngx-logger';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44388/',
  redirectUri: baseUrl,
  clientId: 'Hayaan_App',
  responseType: 'code',
  scope: 'offline_access Hayaan',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Hayaan',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44388',
      rootNamespace: 'Hayaan',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
export const Config = {
  loggerConfig: {
    level: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.OFF,
    enableSourceMaps: true,
  } as INGXLoggerConfig,
  sessionTimeOut: {
    sessionTimeMinute: 90,
    sessionTimeAttentionMinute: 1,
  },
};
