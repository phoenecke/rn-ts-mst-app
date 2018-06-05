import { inject, observer } from 'mobx-react'
import * as React from 'react'
import {
  Image,
  ImageStyle,
  SafeAreaView,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { IMovie } from '../../models/movie-store'
import { RootStore } from '../../models/root-store'
import { color, spacing } from '../../theme'
import { BackButton } from '../common/back-button'
import { Wallpaper } from '../common/wallpaper'

interface IProps extends NavigationScreenProps<{}> {
  movie: IMovie
}

@inject((rootStore: RootStore) => {
  const movieStore = rootStore.movieStore
  return {
    movie: movieStore.selectedMovie,
  }
})
@observer
class MovieDetails extends React.Component<IProps> {
  public goBack = () => this.props.navigation.goBack(null)
  public render() {
    const { movie } = this.props
    const year = movie.releaseDate.split('-')[0]
    return (
      <View style={CONTAINER}>
        <Wallpaper />
        <View style={HEADER}>
          <Image
            source={{ uri: movie.backdropPath }}
            style={BACKDROP_IMAGE}
            resizeMode="cover"
          />
          <BackButton goBack={this.goBack} />
          <Text numberOfLines={2} style={TITLE}>
            {movie.title}
            <Text style={YEAR}> ({year})</Text>
          </Text>
        </View>
        <SafeAreaView />
      </View>
    )
  }
}

export default MovieDetails

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
}

const TITLE: TextStyle = {
  flex: 1,
  fontSize: 22,
  color: color.text,
  margin: spacing.small,
  marginLeft: spacing.small * 2,
  textShadowColor: '#000',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1,
}

const HEADER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  height: 120,
  paddingTop: spacing.small,
}

const BACKDROP_IMAGE: ImageStyle = {
  opacity: 0.3,
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
}

const YEAR: TextStyle = {
  opacity: 0.65,
  fontSize: 14,
}
