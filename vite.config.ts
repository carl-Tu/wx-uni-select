import { defineConfig, loadEnv, createLogger, type UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslintPlugin from 'vite-plugin-eslint'
import fs from 'fs'
import path from 'path'

/**
 * @description 动态修改 manifest.json
 * @return {*}
 */
class Manifest {
  private manifestPath: string = './src/manifest.json'
  private manifest: string

  constructor() {
    this.manifest = fs.readFileSync(path.join(__dirname, this.manifestPath), { encoding: 'utf-8' })
  }

  replace(path: string, value: string) {
    const arr = path.split('.')
    const len = arr.length
    const lastItem = arr[len - 1]

    let i = 0
    const ManifestArr = this.manifest.split(/\n/)

    for (let index = 0, _len = ManifestArr.length; index < _len; index++) {
      const item = ManifestArr[index]
      if (new RegExp(`"${arr[i]}"`).test(item)) ++i
      if (i === len) {
        const hasComma = /,/.test(item)
        ManifestArr[index] = item.replace(
          new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
          `"${lastItem}": ${value}${hasComma ? ',' : ''}`
        )
        break
      }
    }

    this.manifest = ManifestArr.join('\n')

    createLogger().info(`[manifest] set ${path} = ${value}`)
  }

  write() {
    fs.writeFileSync(path.join(__dirname, this.manifestPath), this.manifest, {
      flag: 'w'
    })

    createLogger().info('[manifest] write config success !')
  }
}

export default defineConfig(({ command, mode }) => {
  console.log('mode ======>', mode)
  const env = loadEnv(mode, process.cwd())

  // 根据环境变量 向 manifest.json 写入 appid
  const m = new Manifest()
  m.replace('mp-weixin.appid', `"${env.VITE_WECHAT_APPID || ''}"`)
  m.write()

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
    // commonjs(/* options */),
    uni(),
    // svgLoader(),
    eslintPlugin({
      fix: true
    })
    // Components({
    //   dts: 'types/components.d.ts',
    //   resolvers: [VantResolver()]
    // })
  ]

  return {
    define: {
      __APP_COMMAND_IS_BUILD__: isBuild
    },
    server,
    plugins
  }
})
