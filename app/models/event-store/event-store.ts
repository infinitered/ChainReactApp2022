import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { EventModel, Event, EventSnapshot } from "../event/event"
import { SpeakerModel, SpeakerSnapshot } from "../speaker/speaker"
import { SettingModel } from "../setting/setting"
import { EVENT_DAYS } from ".."
import { delay } from "../../utils/delay"

const DATA_URL =
  "https://raw.githubusercontent.com/infinitered/ChainReactApp2022/main/assets/data/event-data.json"

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
    errorMessage: "",
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
  }))
  .actions((store) => ({
    setStatus(newStatus: "pending" | "done" | "error", errorMessage?: string) {
      store.status = newStatus
      if (errorMessage) store.errorMessage = errorMessage
    },
  }))
  .actions((store) => ({
    fetchData() {
      return fetch(DATA_URL).then((response) => {
        response.json().then((json) => {
          const conf2022 = json["conferences"]["2022"]

          applySnapshot(store, {
            speakers: conf2022["speakers"] as SpeakerSnapshot[],
            events: conf2022["events"] as EventSnapshot[],
            attractions: conf2022["attractions"] as any,
          })
          store.setStatus("done")
        })
      })
    },
  }))
  .actions((store) => ({
    // React Native doesn't like this as an async function :-/
    refresh() {
      store.setStatus("pending", "")

      // we delay just a bit, to make it feel more like a refresh
      return delay(500)
        .then(() => store.fetchData())
        .catch((e) => {
          console.tron.log((e as Error).message)
          store.setStatus("error", (e as Error).message)
        })
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
