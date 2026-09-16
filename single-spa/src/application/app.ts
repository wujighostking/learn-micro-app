import type { App } from '@/schema/app'
import { reroute } from '@/navigation'
import { NOT_LOADED } from './app.helper'

export const apps: App[] = []

export function registerApplication(appName: string, loadApp: () => any, activeWhen: (location: Location) => boolean, customProps: Record<any, any>) {
  const registration: App = { name: appName, loadApp, activeWhen, customProps, status: NOT_LOADED }

  apps.push(registration)

  reroute()
}
