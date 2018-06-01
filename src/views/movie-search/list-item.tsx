import * as React from 'react'
import {
  Image,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { IMovie } from '../../services/api'
import { color, spacing } from '../../theme'

interface IProps {
  movie: IMovie
  onPress: (id: number) => any
}

export default class ListItem extends React.Component<IProps> {
  public onPress = () => {
    this.props.onPress(this.props.movie.id)
  }

  public render() {
    const { movie } = this.props
    const year = movie.releaseDate.split('-')[0]
    return (
      <TouchableOpacity style={OUTER} onPress={this.onPress}>
        <Image
          style={IMAGE}
          resizeMode="contain"
          source={{ uri: movie.posterPath }}
        />
        <View style={INFO}>
          <Text numberOfLines={2} style={TITLE}>
            {movie.title}
            <Text style={DATE}> ({year})</Text>
          </Text>
          <Text numberOfLines={6} style={OVERVIEW}>
            {movie.overview}
          </Text>
          <View style={FOOTER}>
            <View style={RATING}>
              <Text style={RATING_VALUE}>
                {Math.round(movie.voteAverage * 10)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const TITLE: TextStyle = {
  fontSize: 14,
  color: color.text,
  fontWeight: 'bold',
}

const IMAGE: ImageStyle = {
  width: 100,
  height: undefined,
  alignSelf: 'stretch',
  resizeMode: 'contain',
}

const OUTER: ViewStyle = {
  flexDirection: 'row',
  height: 150,
  marginBottom: spacing.small,
  backgroundColor: 'rgba(255,255,255, 0.1)',
}

const FOOTER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

const DATE: TextStyle = {
  opacity: 0.65,
  fontSize: 13,
  color: color.text,
}

const RATING: ViewStyle = {
  width: 25,
  height: 25,
  backgroundColor: color.text,
  borderRadius: 12.5,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-end',
}

const RATING_VALUE: TextStyle = {
  fontSize: 13,
  color: '#1F0808',
}

const OVERVIEW: TextStyle = {
  color: color.text,
  padding: spacing.tiny,
  marginBottom: spacing.tiny,
  marginHorizontal: spacing.tiny,
  fontSize: 12,
  flex: 1,
  paddingRight: 0,
}

const INFO: ViewStyle = {
  flex: 1,
  margin: spacing.small,
}
