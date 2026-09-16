import type { App } from '@/schema/app'
import { getAppChanges, shouldBeActive } from '@/application/app.helper'
import { toBootStrapPromise } from '@/lifecycles/bootstrap'
import { toLoadPromise } from '@/lifecycles/load'
import { toMountPromise } from '@/lifecycles/mount'
import { toUnmountPromise } from '@/lifecycles/unmount'
import { started } from '@/start'
import './navigation-event'

export function reroute() {
  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()

  if (started) {
    return performAppChange()
  }

  return loadApps()

  function loadApps() {
    return Promise.all(appsToLoad.map(app => toLoadPromise(app)))
  }

  function performAppChange() {
  //   将不需要的应用卸载掉
    const unmountAllPromise = Promise.all(appsToUnmount.map(app => toUnmountPromise(app)))

    Promise.all(appsToLoad.map(app => toLoadPromise(app).then(app => tryBootstrapAndMount(app, unmountAllPromise))))

    Promise.all(appsToMount.map(app => tryBootstrapAndMount(app, unmountAllPromise)))
  }

  function tryBootstrapAndMount(app: App, unmountAllPromise: Promise<any>) {
    if (shouldBeActive(app)) {
      return toBootStrapPromise(app).then(app => unmountAllPromise.then(() => toMountPromise(app!)))
    }
  }
}
