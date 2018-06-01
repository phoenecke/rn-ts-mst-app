import { StackNavigator } from 'react-navigation'
import MovieSearch from '../views/movie-search'

export const RootNavigator = StackNavigator(
  {
    exampleStack: { screen: MovieSearch },
  },
  {
    headerMode: 'none',
    navigationOptions: { gesturesEnabled: false },
  }
)
