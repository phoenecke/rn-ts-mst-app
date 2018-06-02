import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import Config from 'react-native-config'
import { IMovie } from '../../models/movie-store'
import { getGeneralApiProblem } from './api-problem'
import * as Types from './api.types'

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  public apisauce: ApisauceInstance

  constructor() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: Config.BASE_URI,
      timeout: 10000,
      params: {
        api_key: Config.API_KEY,
      },
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
  }

  /**
   * Search movies.
   */
  public async moviesSearch(search: string): Promise<Types.MoviesSearchResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      '/search/movie',
      { query: search }
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) {
        return problem
      }
    }

    // transform the data into the format we are expecting
    try {
      const movies: IMovie[] = response.data.results.map((r: any) => {
        return {
          id: r.id,
          posterPath: Config.THUMB_BASE_URI + r.poster_path,
          overview: r.overview,
          releaseDate: r.release_date,
          title: r.title,
          backdropPath: Config.BACKGROUND_BASE_URI + r.backdrop_path,
          popularity: r.popularity,
          voteAverage: r.vote_average,
        } as IMovie
      })
      return { kind: 'ok', movies }
    } catch {
      return { kind: 'bad-data' }
    }
  }
}
