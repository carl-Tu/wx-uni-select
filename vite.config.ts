import { defineConfig, loadEnv, type UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslintPlugin from 'vite-plugin-eslint'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)
  const isBuild = command === 'build'

  const server: UserConfig['server'] = {
    proxy: {
      '^/api/.*': {
        target: env.VITE_API_HOST,
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }

  const plugins: UserConfig['plugins'] = [
    uni(),
    eslintPlugin({
      fix: true
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [VantResolver()]
    })
  ]

  return {
    define: {
      __APP_COMMAND_IS_BUILD__: isBuild
    },
    server,
    plugins
  }
})
