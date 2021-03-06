import { clear } from '../../lib/storage'
import { RootStore } from '../../models/root-store'

export type GetRootStore = () => RootStore

export const commandMiddleware = (getRootStore: GetRootStore) => {
  return () => {
    return {
      onCommand: async (command: any) => {
        if (command.type !== 'custom') {
          return
        }
        switch (command.payload) {
          case 'resetStore':
            console.tron.log('resetting store')
            clear()
            break
          case 'resetNavigation':
            console.tron.log('resetting navigation store')
            getRootStore().navigationStore.reset()
            break
        }
      },
    }
  }
}
