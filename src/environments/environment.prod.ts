import { Environment } from '@abp/ng.core';

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
  production: true,
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
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
