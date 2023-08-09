/*
 * @Author: wanzp
 * @Date: 2022-07-11 19:35:59
 * @LastEditors: wanzp
 * @LastEditTime: 2023-08-09 10:55:49
 * @Description: vite配置
 */
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    resolve: {
      // 别名
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
      // 支持的后缀
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.less'],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    // 开发选项
    server: {
      port: Number(loadEnv(mode, process.cwd()).VITE_PORT),
      host: '0.0.0.0',
      fs: {
        strict: false, // 解决Unrestricted file system access  vite对根目录的访问做了限制
      },
      proxy: {
        [loadEnv(mode, process.cwd()).VITE_BASE_URL]: {
          target: loadEnv(mode, process.cwd()).VITE_PROXY_URL,
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(loadEnv(mode, process.cwd()).VITE_BASE_URL, ''),
        },
      },
    },
    build: {
      sourcemap: loadEnv(mode, process.cwd()).VITE_NODE_ENV + '' !== 'production',
      outDir: loadEnv(mode, process.cwd()).VITE_OUTPUT_DIR + '',
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: {
            vue: ['vue'],
            'vue-router': ['vue-router'],
            pinia: ['pinia'],
            axios: ['axios'],
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]', // 拆分js到模块文件夹 // chunkFileNames: (chunkInfo) => { //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []; //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'; //     return `js/${fileName}/[name].[hash].js`; // },
        },
      },
    },
    plugins: [
      vue(),
      requireTransform({
        fileRegex: /.ts$|.tsx$|.vue$/,
      }),
    ],
  });
};
