import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createTalkStoreDefaultModel } from ".."

/**
 * This is our primary store that holds all other stores.
 */
export const RootStoreModel = types.model("RootStore").props({
  talkStore: createTalkStoreDefaultModel(),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
