import { reroute } from '@/navigation/reroute'

function urlRoute() {
  reroute()
}

window.addEventListener('hashchange', urlRoute)
window.addEventListener('popstate', urlRoute)
