import { ConfigStateService } from '@abp/ng.core';

import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GetConfigService implements OnInit {
  ngOnInit(): void {}
  constructor(private configState: ConfigStateService) {}
  getSettingByKey<T>(key: string): T {
    let data = this.configState.getSetting(key);
    return data as any as T;
  }
}
