import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EVENT_DAYS } from ".."
import { EventModel } from "../event/event"
import { SettingModel } from "../setting/setting"

/**
 * This holds all talks and other events for the conference,
 * as well as the API status and settings.
 */
export const EventStoreModel = types
  .model("EventStore")
  .props({
    events: types.optional(types.array(EventModel), []),
    status: types.optional(types.enumeration(["pending", "done", "error"]), "done"),
    updatedAt: types.maybe(types.Date),
    settings: types.optional(types.array(SettingModel), []),
  })
  .views((store) => ({
    eventsForDay(day: EVENT_DAYS) {
      return store.events.filter((ev) => ev.day === day)
    },
  }))
  .views((store) => ({
    get workshops() {
      return store.eventsForDay("wednesday")
    },
    get thursdayEvents() {
      return store.eventsForDay("thursday")
    },
    get fridayEvents() {
      return store.eventsForDay("friday")
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async getAll() {
      // get all the datas pls
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type EventStoreType = Instance<typeof EventStoreModel>
export interface EventStore extends EventStoreType {}
type EventStoreSnapshotType = SnapshotOut<typeof EventStoreModel>
export interface EventStoreSnapshot extends EventStoreSnapshotType {}
export const createEventStoreDefaultModel = () => types.optional(EventStoreModel, {})
