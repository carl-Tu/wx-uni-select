declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare const __APP_COMMAND_IS_BUILD__: boolean
