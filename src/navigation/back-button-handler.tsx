import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { NavigationStore } from '../models/navigation-store'

interface IBackButtonHandlerProps {
  navigationStore?: NavigationStore
  /**
   * Are we allowed to exit?
   */
  canExit(routeName: string): boolean
}

@inject('navigationStore')
@observer
export class BackButtonHandler extends React.Component<
  IBackButtonHandlerProps
> {
  /**
   * Subscribe when we come to life.
   */
  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  /**
   * Unsubscribe when we're done.
   */
  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  /**
   * Fires when the back button is pressed on android.
   */
  public onBackPress = () => {
    if (!this.props.navigationStore) {
      return true
    }
    // grab the current route
    const routeName = this.props.navigationStore.findCurrentRoute().routeName

    // are we allowed to exit?
    if (this.props.canExit(routeName)) {
      // let the system know we've not handled this event
      return false
    } else {
      // we can't exit, so let's turn this into a back action
      this.props.navigationStore.dispatch(NavigationActions.back())
      // let the system know we've handled this event
      return true
    }
  }

  /**
   * Renders the children or nothing if they weren't passed.
   */
  public render() {
    return this.props.children
  }
}
