import * as Pinia from 'pinia'
import { createPinia as _createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import devalue from '@nuxt/devalue'
import type { App } from 'vue'

export const pinia = _createPinia()

export const createPinia = (app: App) => {
  pinia.use(
    createPersistedState({
      storage: {
        getItem(key: string): string | null {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        }
      }
    })
  )
  app.use(pinia)

  devalue(pinia.state.value)
}

export { Pinia }
