import { defineStore } from 'pinia'

import { logout, login, getUserInfo } from '@/apis'

interface IUserState {
  token: string
  userinfo: Record<string, any>
}

const getNameFromGrade = (arr, TgradeID) =>
  arr.reduce((total, item) => {
    const {
      children,
      id,
      item: { grade, name }
    } = item
    if (grade === TgradeID) {
      total.push({ name, id })
    } else {
      if (children) {
        return getNameFromGrade(children, TgradeID)
      }
    }
    return total
  }, [])

export const useUserStore = defineStore('user', {
  persist: {
    paths: ['token']
  },
  state: (): IUserState => ({
    token: '',
    userinfo: {}
  }),
  actions: {
    logout() {
      return new Promise<void>((resolve, reject) => {
        logout()
          .then(res => {
            if (res.data.status !== 10200) {
              uni.showToast({ title: res.data.msg, icon: 'error' })
              resolve()
              return
            }

            this.userinfo = {}
            uni.redirectTo({ url: '/pages/login/login' })
            resolve()
          })
          .catch(err => reject(err))
      })
    },

    login(...args: Parameters<typeof login>) {
      return new Promise<Record<string, any>>((resolve, reject) => {
        login(...args)
          .then(res => {
            if (res.data.status !== 10200) {
              resolve(res)
              return
            }

            this.token = res.data.data
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },

    getUserInfo() {
      return new Promise<void>((resolve, reject) => {
        getUserInfo()
          .then(result => {
            if (result.data.status !== 10200) {
              resolve()
              return
            }
            const unitname2Arr = getNameFromGrade(result.data.data.zoneList, 3) || []

            const unitname2Id =
              unitname2Arr
                .reduce((total, { id }) => {
                  total.push(id)
                  return total
                }, [])
                .join(',') || ''

            const unitname2 =
              unitname2Arr
                .reduce((total, { name }) => {
                  total.push(name)
                  return total
                }, [])
                .join(',') || '/'

            const [{ name: unitname, id: unit }] = getNameFromGrade(result.data.data.zoneList, 4) || [
              { name: '', id: '' }
            ]
            const [{ id: unit3 }] = getNameFromGrade(result.data.data.zoneList, 3) || [{ id: '' }]
            const grade5 = getNameFromGrade(result.data.data.zoneList, 5) || []
            const zonenames =
              grade5
                .reduce((total, { name }) => {
                  total.push(name)
                  return total
                }, [])
                .join(',') || '/'

            const obj = result.data.data
            delete obj.zoneList
            obj.gaj = unitname2
            obj.gajid = unitname2Id
            obj.pcs = unitname
            obj.gxqy = zonenames || '/'
            obj.qybm4 = unit
            obj.qybm3 = unit3
            obj.token = this.token

            this.userinfo = obj
            uni.switchTab({ url: '/pages/index/index' })
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
})
