import { Api } from '../services/api'
import { Reactotron } from '../services/reactotron'

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  public api: Api
  public reactotron: Reactotron

  constructor(api: Api, reactotron: Reactotron) {
    this.api = api
    this.reactotron = reactotron
  }
}
