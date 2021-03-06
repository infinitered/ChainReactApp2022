import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"
import { EventSnapshot, SpeakerSnapshot } from ".."

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  // try {
  //   // load data from storage
  //   data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
  //   rootStore = RootStoreModel.create(data, env)
  // } catch (e) {
  // if there's any problems loading, then let's at least fallback to an empty state
  // instead of crashing.
  const conf2022 = require("../../../assets/data/event-data.json")["conferences"]["2022"]

  try {
    rootStore = RootStoreModel.create(
      {
        eventStore: {
          speakers: conf2022["speakers"] as SpeakerSnapshot[],
          events: conf2022["events"] as EventSnapshot[],
          attractions: conf2022["attractions"] as any,
        },
      },
      env,
    )
  } catch (e) {
    if (__DEV__) {
      console.tron.logImportant("Helllllooo")
      console.tron.error(e.message, null)
    }
  }
  // but please inform us what happened
  // __DEV__ && console.tron.error(e.message, null)
  // }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}
