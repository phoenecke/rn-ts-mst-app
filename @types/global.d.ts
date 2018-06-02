import Tron from 'reactotron-react-native'

declare global {
  interface Console {
    tron: typeof Tron
  }
}
