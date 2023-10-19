import { defineConfig,loadEnv } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default ({ mode }) =>
	defineConfig({
		plugins: [uni()],
		server: {
			port: 19527,
			proxy: {
				'/energy/ems-api/': {
					target: loadEnv(mode, process.cwd()).VITE_PROXY_URL,
					changeOrigin: true, //是否跨域
					rewrite: (path) => path.replace(/^\/energy\/ems-api/, ''),
				},
			},
		},
		resolve: {
			// 别名
			alias: [
				{
					find: '@',
					replacement: resolve(__dirname, './src'),
				},
			],
		},
	});
