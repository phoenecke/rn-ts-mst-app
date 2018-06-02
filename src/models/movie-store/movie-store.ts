import { flow, getEnv, types } from 'mobx-state-tree'

export const MovieModel = types.model('Movie', {
  id: types.number,
  posterPath: types.maybe(types.string),
  overview: types.string,
  releaseDate: types.string,
  title: types.string,
  backdropPath: types.maybe(types.string),
  popularity: types.number,
  voteAverage: types.number,
})

export type IMovie = typeof MovieModel.Type

export const MovieStoreModel = types
  .model('MovieStore', {
    movies: types.array(MovieModel),
    search: '',
    selectedId: types.maybe(types.number),
  })
  .views(self => {
    return {
      get selectedMovie() {
        return self.movies.find(m => m.id === self.selectedId)
      },
    }
  })
  .actions(self => {
    const searchMovies = flow(function* loadBooks() {
      try {
        const api = getEnv(self).api
        const response = yield api.moviesSearch(self.search)
        if (response.kind === 'ok') {
          self.movies = response.movies
        }
      } catch (err) {
        console.error('Failed to search ', err)
      }
    })

    const searchChange = (search: string) => {
      self.search = search
    }

    const selectedIdChange = (selectedId: number) => {
      self.selectedId = selectedId
    }

    return {
      searchMovies,
      searchChange,
      selectedIdChange,
    }
  })

/**
 * The MovieStore instance.
 */
export type MovieStore = typeof MovieStoreModel.Type

/**
 * The data of an MovieStore.
 */
export type MovieStoreSnapshot = typeof MovieStoreModel.SnapshotType
