import { IMovie } from '../../models/movie-store'
import { GeneralApiProblem } from './api-problem'

// export interface IMovie {
//   id: number
//   posterPath?: string
//   overview: string
//   releaseDate: string
//   title: string
//   backdropPath?: string
//   popularity: number
//   voteAverage: number
// }

export type MoviesSearchResult =
  | { kind: 'ok'; movies: IMovie[] }
  | GeneralApiProblem
