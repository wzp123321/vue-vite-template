<template>
  <button @click="test">test</button>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
//引入store
import useUserStore from './pinia/user';

const store = useUserStore();
// 解构store/user.ts中userInfo的信息,让数据变成响应式，这样就可以在组件中修改store中的数据
let { count } = storeToRefs(store);
console.log(count.value);

const test = () => {
  store.$patch((state) => {
    state.count += 9;
  });
  console.log(count.value);
};
</script>
<style lang="less" scoped></style>
