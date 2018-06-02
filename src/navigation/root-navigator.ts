import { StackNavigator } from 'react-navigation'
import MovieDetails from '../views/movie-details'
import MovieSearch from '../views/movie-search'

export const RootNavigator = StackNavigator(
  {
    exampleStack: { screen: MovieSearch },
    movieDetails: { screen: MovieDetails },
  },
  {
    headerMode: 'none',
  }
)
