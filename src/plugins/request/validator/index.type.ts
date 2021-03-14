export type IStrategieType = 'BUSINESS_ERROR' | 'NOT_AUTH';

export interface IStrategie {
  strategy: IStrategieType;
  codeKey: string;
  codeValue: string | number;
}

export type IStrategieInParams = {
  data: any;
  config: IAxiosRequestConfig;
} & Omit<IStrategie, 'strategy'>;
