import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EventModel, Event } from "../event/event"
import { SpeakerModel } from "../speaker/speaker"
import { SettingModel } from "../setting/setting"
import { EVENT_DAYS } from ".."

/**
 * This holds all talks and other events for the conference,
 * as well as the API status and settings.
 */
export const EventStoreModel = types
  .model("EventStore")
  .props({
    events: types.optional(types.array(EventModel), []),
    speakers: types.optional(types.array(SpeakerModel), []),
    currentEvent: types.maybeNull(types.reference(EventModel)),
    status: types.optional(types.enumeration(["pending", "done", "error"]), "done"),
    updatedAt: types.maybe(types.Date),
    settings: types.optional(types.array(SettingModel), []),
    attractions: types.frozen(),
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
    setCurrentEvent(event: Event) {
      store.currentEvent = event
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type EventStoreType = Instance<typeof EventStoreModel>
export interface EventStore extends EventStoreType {}
type EventStoreSnapshotType = SnapshotOut<typeof EventStoreModel>
export interface EventStoreSnapshot extends EventStoreSnapshotType {}
export const createEventStoreDefaultModel = () => types.optional(EventStoreModel, {})
