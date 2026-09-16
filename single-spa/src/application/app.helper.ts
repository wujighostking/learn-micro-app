// app status
import type { App } from '@/schema/app'
import { apps } from '@/application/app'

export const NOT_LOADED = 'NOT_LOADED' // 没有被加载
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE' // 路径匹配了 要去加载这个资源
export const LOAD_ERROR = 'LOAD_ERROR'

// 启动的过程
export const NOT_BOOTSTRAPED = 'NOT_BOOTSTRAPED' // 资源加载完毕了 需要启动，此时还没有启动
export const BOOTSTRAPING = 'BOOTSTRAPING' // 启动中
export const NOT_MOUNTED = 'NOT_MOUNTED' // 没有被挂载

// 挂载流程
export const MOUNTING = 'MOUNTING' // 正在挂载
export const MOUNTED = 'MOUNTED' // 挂载完成

// 卸载流程
export const UNMOUNTING = 'UNMOUNTING' // 卸载中

export function isActive(app: App) {
  return app.status === MOUNTED
}

export function shouldBeActive(app: App) {
  return app.activeWhen(window.location)
}

export function getAppChanges() {
  const appsToLoad: App[] = []
  const appsToMount: App[] = []
  const appsToUnmount: App[] = []

  apps.forEach((app) => {
    const appShouldBeActive = shouldBeActive(app)

    switch (app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE: {
        if (appShouldBeActive) {
          appsToLoad.push(app)
        }
        break
      }

      case NOT_BOOTSTRAPED:
      case BOOTSTRAPING:
      case NOT_MOUNTED: {
        if (appShouldBeActive) {
          appsToMount.push(app)
        }
        break
      }

      case MOUNTED: {
        if (!appShouldBeActive) {
          appsToUnmount.push(app)
        }
        break
      }

      default: {
        break
      }
    }
  })

  return {
    appsToLoad,
    appsToMount,
    appsToUnmount,
  }
}
