import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      // 需要自动引入的文件
      include: [/\.[j]sx?$/, /\.vue$/, /\.vue\?vue/, /\.nvue$/, /\.nvue\?nvue/, /\.md$/],
      // 全局自动引入api预设
      imports: [
        // 插件预设支持导入的api
        'vue',
        // 'vue-router',
        'pinia',
        'uni-app',
        // 自定义导入的api
      ],
      // eslint配置
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: './auto-imports.d.ts',
      // dts:false
    }),
  ],
});
