const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  publicPath: '/',
  outputDir: 'dist/webpack-template-web',
  devServer: {
    port: 8848,
  },
  terser: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
      },
    },
  },
  configureWebpack: {
    entry: resolve(__dirname, 'src/main.ts'),
    extends: [],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
        {
          test: /.ts$/,
          use: ['ts-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // 代码分割
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          // 默认不需要去配置, 压缩js
          parallel: true, // 使用cpu多核来构建
          extractComments: false, // 打包后的 LICENSE.txt 注释文件去吃
          terserOptions: {
            compress: {
              arguments: true,
              dead_code: true,
            }, // 设置压缩相关的选项；
            mangle: true, // 设置丑化相关的选项，可以直接设置为true；
            toplevel: true, // 底层变量是否进行转换；
            keep_classnames: false, // 保留类的名称；
            keep_fnames: false, // 保留函数的名称；
          },
        }),
      ],
    },
  },
});
