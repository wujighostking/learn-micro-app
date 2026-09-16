import type { AppCycle } from 'single-spa'
import { registerApplication, start } from 'single-spa'

function main() {
  const app1: AppCycle = {
    async bootstrap() {
      console.log('app1 bootstrap')
    },

    async mount() {
      console.log('app1 mount1')
    },

    async unmount() {
      console.log('app1 unmount')
    },
  }

  const app2: AppCycle = {
    async bootstrap() {
      console.log('app2 bootstrap')
    },

    async mount() {
      console.log('app2 mount')
    },

    async unmount() {
      console.log('app2 unmount')
    },
  }

  registerApplication('app1', async () => app1, (location: Location) => location.hash.startsWith('#/app1'), { a: 'app1' })
  registerApplication('app2', async () => app2, (location: Location) => location.hash.startsWith('#/app2'), { a: 'app2' })

  start()
}

main()
