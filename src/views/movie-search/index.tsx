import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { IMovie } from '../../models/movie-store'
import { RootStore } from '../../models/root-store'
import { color, spacing } from '../../theme'
import { Wallpaper } from '../common/wallpaper'
import ListItem from './list-item'

interface IProps extends NavigationScreenProps<{}> {
  searchChange: (search: string) => any
  searchMovies: () => any
  selectedIdChange: (id: number) => any
  search: string
  movies: IMovie[]
}

@inject((rootStore: RootStore) => {
  const movieStore = rootStore.movieStore
  return {
    movies: movieStore.movies,
    search: movieStore.search,
    selectedIdChange: movieStore.selectedIdChange,
    searchChange: movieStore.searchChange,
    searchMovies: movieStore.searchMovies,
  }
})
@observer
class MovieSearch extends React.Component<IProps> {
  public onSearchChange = (search: string) => {
    this.props.searchChange(search)
  }

  public onSearchMovies = () => {
    if (this.props.search) {
      this.props.searchMovies()
    }
  }

  public onPress = (id: number) => {
    this.props.selectedIdChange(id)
    this.props.navigation.navigate('MovieDetailsScreen')
  }

  public render() {
    return (
      <View style={CONTAINER}>
        <Wallpaper />
        <View style={SEARCH_BAR}>
          <TextInput
            style={INPUT}
            onChangeText={this.onSearchChange}
            onSubmitEditing={this.onSearchMovies}
            value={this.props.search}
            placeholder="Search Movies"
          />
          <TouchableOpacity style={SEARCH_BUTTON} onPress={this.onSearchMovies}>
            <Text style={TITLE}>Go!</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={MOVIES} contentContainerStyle={MOVIES_CONTAINER}>
          {this.props.movies.map(movie => {
            return (
              <ListItem key={movie.id} movie={movie} onPress={this.onPress} />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default MovieSearch

const CONTAINER: ViewStyle = {
  paddingBottom: 0,
  flex: 1,
}

const TITLE: TextStyle = {
  fontSize: 14,
  color: color.text,
  fontWeight: 'bold',
}

const MOVIES_CONTAINER: ViewStyle = {
  flexGrow: 1,
  margin: spacing.small,
}

const MOVIES: ViewStyle = {
  marginTop: 0,
}

const INPUT: TextStyle = {
  backgroundColor: color.text,
  color: '#000',
  height: 40,
  flex: 1,
  padding: spacing.small,
}
const SEARCH_BAR: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  margin: spacing.small,
  marginTop: spacing.large,
  marginBottom: 0,
}

const SEARCH_BUTTON: ViewStyle = {
  backgroundColor: color.primary,
  height: 40,
  width: 40,
  justifyContent: 'center',
  alignItems: 'center',
}
