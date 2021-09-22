import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EventStoreModel } from "../event-store/event-store"

/**
 * This is our primary store that holds all other stores.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    eventStore: types.optional(
      types.late(() => EventStoreModel),
      {},
    ),
  })
  .actions((root) => ({
    reset() {
      // Need to properly reset everything here
      // root.eventStore = EventStoreModel.create({})
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
