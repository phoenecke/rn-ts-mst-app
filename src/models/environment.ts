import { Api } from '../services/api'

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  public api: Api

  constructor(api: Api) {
    this.api = api
  }
}
