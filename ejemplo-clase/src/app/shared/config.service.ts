import {Injectable} from '@angular/core';
// import * as configcat from 'configcat-js';
// import {IConfigCatClient} from 'configcat-common/lib/ConfigCatClient';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // configCatClient: IConfigCatClient;
  constructor() {
    // this.configCatClient = configcat.createClient('GQHYCH9da06FNn626m4-cA/Dtz4WPhDy0O2Beo_ST7cHg');
  }

  async getConfig(featureName: string) {
    // return this.configCatClient.getValueAsync(featureName, false);
    return Promise.resolve(false);
  }
}
