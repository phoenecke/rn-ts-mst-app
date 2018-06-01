import { Provider } from 'mobx-react'
import * as React from 'react'
import { StatusBar } from 'react-native'
import { RootStore } from '../models/root-store'
import { StatefulNavigator } from '../navigation'
import { BackButtonHandler } from '../navigation/back-button-handler'
import { DEFAULT_NAVIGATION_CONFIG } from '../navigation/navigation-config'
import { setupRootStore } from './setup-root-store'

interface IRootComponentState {
  rootStore?: RootStore
}

/**
 * This is the root component of our app.
 */
export class RootComponent extends React.Component<{}, IRootComponentState> {
  /**
   * When the component is mounted. This happens asynchronously and simply
   * re-renders when we're good to go.
   */
  public async componentDidMount() {
    this.setState({
      rootStore: await setupRootStore(),
    })
  }

  /**
   * Are we allowed to exit the app?  This is called when the back button
   * is pressed on android.
   *
   * @param routeName The currently active route name.
   */
  public canExit(routeName: string) {
    return DEFAULT_NAVIGATION_CONFIG.exitRoutes.includes(routeName)
  }

  public render() {
    const rootStore = this.state && this.state.rootStore

    // Before we show the app, we have to wait for out state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    //
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    if (!rootStore) {
      return null
    }

    // otherwise, we're ready to render the app

    // --- am: begin list of stores ---
    const otherStores = {
      movieStore: rootStore.movieStore,
    }
    // --- am: end list of stores ---

    return (
      <Provider
        rootStore={rootStore}
        navigationStore={rootStore.navigationStore}
        {...otherStores}
      >
        <BackButtonHandler canExit={this.canExit}>
          <StatusBar barStyle="light-content" />
          <StatefulNavigator />
        </BackButtonHandler>
      </Provider>
    )
  }
}
