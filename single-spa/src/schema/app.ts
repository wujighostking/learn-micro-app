export interface App extends AppCycle {
  name: string
  loadApp: (props?: App['customProps']) => Promise<any>
  activeWhen: (location: Location) => boolean
  customProps: Record<any, any>
  status: string
}

export interface AppCycle {
  bootstrap?: (props: App['customProps']) => Promise<void>
  mount?: (props: App['customProps']) => Promise<void>
  unmount?: (props: App['customProps']) => Promise<void>
}
