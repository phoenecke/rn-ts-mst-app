import { types } from 'mobx-state-tree'
import { MovieStoreModel } from '../movie-store'
import { NavigationStoreModel } from '../navigation-store'

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model('RootStore', {
  navigationStore: types.optional(NavigationStoreModel, {}),
  movieStore: types.optional(MovieStoreModel, {
    movies: [],
    selectedId: 0,
    search: 'hi',
  }),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
