import { getAppChanges } from '@/application/app.helper'

export function reroute() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges()
}
