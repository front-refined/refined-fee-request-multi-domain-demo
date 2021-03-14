import { App } from 'vue';

import Request from './request';

import sifou from './branchs/sifou';
import jianshu from './branchs/jianshu';

const request = new Request();
request.extend(sifou).extend(jianshu);
request.merge();

request.install = (app: App, ...options: any[]) => {
  app.config.globalProperties.$request = request;
};
export default request;
