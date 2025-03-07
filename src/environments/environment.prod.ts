import { Environment } from '@abp/ng.core';
import { INGXLoggerConfig, NgxLoggerLevel } from 'ngx-logger';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://api-hayyan.el.r.appspot.com/',
  redirectUri: baseUrl,
  clientId: 'Hayaan_App',
  responseType: 'code',
  scope: 'offline_access Hayaan',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Hayaan',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://api-hayyan.el.r.appspot.com',
      rootNamespace: 'Hayaan',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;

export const Config = {
  loggerConfig: {
    level: NgxLoggerLevel.ERROR,
    serverLogLevel: NgxLoggerLevel.ERROR,
    enableSourceMaps: false,
  } as INGXLoggerConfig,
  sessionTimeOut: {
    sessionTimeMinute: 90,
    sessionTimeAttentionMinute: 1,
  },
};
