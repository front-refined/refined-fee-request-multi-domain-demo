import { ComponentInternalInstance } from 'vue';
import { AxiosRequestConfig } from 'axios';
declare global {
  interface IAxiosRequestConfig extends AxiosRequestConfig {
    // 标记当前请求的接口域名是什么，默认master，不需要手动控制
    branch?: string;
    // 全局显示 loading，默认false
    loading?: boolean;

    /* ...更多配置... */
  }

  type IRequestMethod = (
    path: string,
    data?: object,
    config?: IAxiosRequestConfig
  ) => any;
  type IRequestMember = IRequestMethod & {
    jianshu: IRequestMethod;
  } & {
    sifou: IRequestMethod;
  };
  interface IRequest {
    get: IRequestMember;
    post: IRequestMember;
  }
  interface IGlobalAPI {
    $request: IRequest;

    /* ...更多其他全局方法... */
  }

  // 全局方法钩子声明
  interface ICurrentInstance extends ComponentInternalInstance {
    appContext: {
      config: { globalProperties: IGlobalAPI };
    };
  }
}

/**
 * 如果你在 Vue3 框架中还留恋 Vue2 Options Api 的写法，需要再新增这段声明
 *
 * @example
 * created(){
 *  this.$request.get();
 *  this.$request.get.sifou();
 *  this.$request.get.jianshu();
 * }
 */
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $request: IRequest;
  }
}
export {};
