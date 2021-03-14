import { message } from 'ant-design-vue';

export const parseCode = (code?: string | number) =>
  code !== undefined && code !== null && code !== ''
    ? isNaN(+code)
      ? code
      : +code
    : code;

export const showMsg = (str: string) => {
  message.destroy();
  message.error({
    content: str
  });
};
