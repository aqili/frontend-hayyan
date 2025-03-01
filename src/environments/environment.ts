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

export interface Config {
  production: boolean;
  application: {
    name: string;
    baseUrl?: string;
    // Add other configuration properties your app needs
  };
  oAuthConfig: {
    issuer: string;
    redirectUri: string;
    clientId: string;
    responseType: string;
    scope: string;
    // Add other OAuth related properties
  };
  apis: {
    default: {
      url: string;
    };
    // Add other API configurations
  };
}

export const environment: Config = {
  production: false,
  application: {
    name: 'Hayyan',
    baseUrl: 'http://localhost:4200'
  },
  oAuthConfig: {
    issuer: 'http://localhost:8080',
    redirectUri: window.location.origin,
    clientId: 'Hayyan_App',
    responseType: 'code',
    scope: 'offline_access Hayyan'
  },
  apis: {
    default: {
      url: 'http://localhost:8080'
    }
  }
};

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
