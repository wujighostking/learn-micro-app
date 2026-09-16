import type { App } from '@/schema/app'
import { LOADING_SOURCE_CODE, NOT_BOOTSTRAPED, NOT_LOADED } from '@/application/app.helper'

export function flattenArrayToPromise(fns: Array<(props: App['customProps']) => Promise<any>> | ((props: App['customProps']) => Promise<any>)) {
  fns = Array.isArray(fns) ? fns : [fns]

  return function (props: App['customProps']) {
    return fns.reduce((prev, fn) => prev.then(() => fn(props)), Promise.resolve())
  }
}

export function toLoadPromise(app: App) {
  return Promise.resolve().then(() => {
    if (app.status !== NOT_LOADED) {
      return app
    }

    app.status = LOADING_SOURCE_CODE

    return app.loadApp(app.customProps).then((cycle) => {
      const { bootstrap, mount, unmount } = cycle
      app.status = NOT_BOOTSTRAPED
      app.bootstrap = flattenArrayToPromise(bootstrap)
      app.mount = flattenArrayToPromise(mount)
      app.unmount = flattenArrayToPromise(unmount)

      return app
    })
  })
}
