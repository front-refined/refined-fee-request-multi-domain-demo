// @/api.config
const APIConfig = require('./apiConfig');
const apiConfig = new APIConfig();
apiConfig
  .add('master', {
    test: 'https://api.juejin.cn',
    prod: 'https://prod.api.juejin.cn'
  })
  .add('jianshu', {
    test: 'https://www.jianshu.com',
    prod: 'https://www.prod.jianshu.com'
  })
  .add('sifou', {
    test: 'https://segmentfault.com',
    prod: 'https://prod.segmentfault.com'
  });
module.exports = (myenv, branch) => apiConfig.get(myenv, branch);
