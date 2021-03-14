import { getCurrentInstance } from 'vue';
function useGlobal() {
  const {
    appContext: {
      config: { globalProperties }
    }
  } = (getCurrentInstance() as unknown) as ICurrentInstance;
  return globalProperties;
}
export default useGlobal;
