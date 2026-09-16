export interface App {
  name: string
  loadApp: () => Promise<void>
  activeWhen: (location: Location) => boolean
  customProps: Record<any, any>
  status: string
}
