import ajax, { type AjaxInstance, type AjaxRequestConfig, type AjaxResponse } from 'uni-ajax'
import { useUserStore } from '@/stores/user'
import { isWhiteList } from '@/apis/_urls'

class RequestInstance {
  instance: AjaxInstance<AjaxRequestConfig>

  constructor(options: AjaxRequestConfig) {
    this.instance = ajax.create(options)

    this.instance.interceptors.request.use(this.request)

    this.instance.interceptors.response.use(this.response, this.error)
  }

  private error(err: any) {
    console.log('HTTP拦截器报错 :>> ', err)
    const errorTitles = {
      11: '无权跨域,请联系管理员!',
      12: '网络出错,请检测当前网络!',
      13: '请求超时,请稍侯再试!',
      14: '解码失败,请联系管理员!',
      19: 'HTTP错误,请联系管理员!',
      20: '请求已被停止/服务端限流!'
    }

    const title = errorTitles[err.error]
    title && uni.showToast({ title, icon: 'error' })

    return Promise.reject(err)
  }

  private request(config: AjaxRequestConfig) {
    const user = useUserStore()

    if (config.header && user.token) {
      config.header['token'] = user.token // 让每个请求携带自定义 token
    }

    if (config.method === 'POST' && !isWhiteList(config.url)) {
      if (!config.data) {
        config.data = {}
      }

      config.data['token'] = user.token ?? ''
    }

    return config
  }

  private response(res: AjaxResponse) {
    // if (res.statusCode !== 200) return Promise.reject(res)
    const isFail = res.data.status !== 10200 && res.data.status
    const isNoLogin = res.data.status === 10401

    if (isFail) {
      uni.showToast({ title: res.data.msg, icon: 'error' })
    }

    if (isNoLogin) {
      uni.reLaunch({ url: '/pages/login/login' })
    }

    return res
  }
}

const { instance: request } = new RequestInstance({
  baseURL: __APP_COMMAND_IS_BUILD__ ? import.meta.env.VITE_API_HOST : '/api',
  timeout: 30 * 1000,
  method: 'POST',
  dataType: 'json',
  header: {
    'content-type': 'application/json' // 默认值
  }
})

export { request }
