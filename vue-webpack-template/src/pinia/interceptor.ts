import { defineStore } from 'pinia';

const useInterceptorStore = defineStore({
  // id 每个store都需要有一个唯一标识
  id: 'interceptor',
  // 数据源
  state: () => ({
    isTokenFailureFlag: false,
  }),
  // getters 类似于 computed，可对 state 的值进行二次计算
  getters: {},
  actions: {},
});

export default useInterceptorStore;
