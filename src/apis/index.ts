import { request } from '@/utils/request'
import { useUserStore } from '@/stores/user'
import { URL } from './_urls'

export const logout = () => request.post(URL.loginOut)

interface LoginOptions {
  openid: string
}

export const login = (username: string, password: string, options?: LoginOptions) => {
  const { openid } = options ?? {}

  return request.post(URL.login, {
    username,
    password,
    verifycode: '1234',
    orApp: '1',
    openid: openid,
    version: '1.7.2'
  })
}

export const getUserInfo = () => request.post(URL.userInfo)

export const getAllNum = (where_gldwsearch: string) => {
  return request.post(URL.allNum, {
    modelTypes: '11,2,12',
    where_status: '1',
    where_gldwsearch
  })
}

export default {
  logout,
  login,
  getUserInfo,
  getAllNum
}
