import * as React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { spacing } from '../../../theme'
// tslint:disable-next-line
const image = require('./arrow-left.png')

interface IProps {
  goBack: () => any
}

export function BackButton({ goBack }: IProps) {
  return (
    <TouchableOpacity
      onPress={goBack}
      style={{
        marginLeft: spacing.small,
      }}
    >
      <Image source={image} />
    </TouchableOpacity>
  )
}
