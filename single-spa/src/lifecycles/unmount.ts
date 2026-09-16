import type { App } from '@/schema/app'
import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from '@/application/app.helper'

export function toUnmountPromise(app: App) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  return Promise.resolve().then(() => {
    if (app.status !== MOUNTED) {
      return app
    }

    app.status = UNMOUNTING

    return app.unmount?.(app.customProps).then(() => {
      app.status = NOT_MOUNTED
      return app
    })
  })
}
