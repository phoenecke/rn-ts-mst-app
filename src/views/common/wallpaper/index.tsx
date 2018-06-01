import React from 'react'
import { Image, ImageStyle } from 'react-native'

// tslint:disable-next-line
const image = require('./bg.png')

export function Wallpaper() {
  return <Image source={image} style={BACKGROUND_IMAGE} />
}

const BACKGROUND_IMAGE: ImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}
