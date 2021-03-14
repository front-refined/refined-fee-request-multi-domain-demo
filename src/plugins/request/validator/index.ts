// @/plugins/request/validator
import Validator from './validator';
const validator = new Validator();
validator
  .add('master', [
    {
      strategy: 'BUSINESS_ERROR',
      codeKey: 'err_no',
      /* 
        配置 code 错误时值为1，如果返回 1 就会全局弹框显示。
        想要看到效果的话，可以改为 0，仅测试显示全局错误弹框,
       */
      codeValue: 1
    },
    {
      strategy: 'NOT_AUTH',
      codeKey: 'err_no',
      /* 
        配置 code 错误时值为3000，如果返回 3000 就会自动跳转至登录页。
        想要看到效果的话，可以改为 0，仅测试跳转至登录页
       */
      codeValue: 3000
    }
  ])
  .add('sifou', [
    {
      strategy: 'BUSINESS_ERROR',
      codeKey: 'status',
      // 配置 code 错误时值为1
      codeValue: 1
    },
    {
      strategy: 'NOT_AUTH',
      codeKey: 'status',
      codeValue: 3000
    }
  ]);
/* ...更多域相关配置... */
// .add();
export default validator;
