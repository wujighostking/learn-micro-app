import { reroute } from '@/navigation'

// eslint-disable-next-line import/no-mutable-exports
export let started = false
export function start() {
  started = true

  reroute()
}
