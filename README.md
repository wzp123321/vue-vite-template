# 创建项目

```
npm install -g create-vite-app

npm init vite@latest <project-name> --template vue
```

# 包管理工具

```
npm i -g pnpm
```

# pinia模块化使用

pinia文件夹下新建文件，id为模块的唯一标识

```
import { storeToRefs } from 'pinia';
//引入store
import useUserStore from './pinia/user';

const store = useUserStore();
// 解构store/user.ts中userInfo的信息,让数据变成响应式，这样就可以在组件中修改store中的数据
let { count } = storeToRefs(store);

const test = () => {
  store.$patch((state) => {
    state.count = 9;
  });
};
```
