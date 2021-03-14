// src/plugins/request/strategies
import { parseCode, showMsg } from './helper';
import router from '@/router';
import { IStrategieInParams, IStrategieType } from './index.type';
/**
 * @desc 请求成功返回的业务逻辑相关错误处理策略
 */
const strategies: Record<
  IStrategieType,
  (obj: IStrategieInParams) => string | undefined
> = {
  // 业务逻辑异常
  BUSINESS_ERROR({ data, codeKey, codeValue }) {
    const message = '系统异常，请稍后再试';
    data[codeKey] = parseCode(data[codeKey]);
    if (data[codeKey] === codeValue) {
      showMsg(message);
      return message;
    }
  },
  // 没有授权登录
  NOT_AUTH({ data, codeKey, codeValue }) {
    const message = '用户未登录，请先登录';
    data[codeKey] = parseCode(data[codeKey]);
    if (data[codeKey] === codeValue) {
      showMsg(message);
      router.replace({ path: '/login' });
      return message;
    }
  }

  /* ...更多策略... */
};
export default strategies;
