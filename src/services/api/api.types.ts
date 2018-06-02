import { IMovie } from '../../models/movie-store'
import { GeneralApiProblem } from './api-problem'

export type MoviesSearchResult =
  | { kind: 'ok'; movies: IMovie[] }
  | GeneralApiProblem
