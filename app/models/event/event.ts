import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SpeakerModel } from "../speaker/speaker"

export type EVENT_DAYS = "wednesday" | "thursday" | "friday"
export const DAYS = ["wednesday", "thursday", "friday"]

/**
 * Info for each conference talk.
 */
export const EventModel = types
  .model("Event")
  .props({
    id: types.identifier,
    startTime: types.string,
    endTime: types.string,
    duration: types.string,
    day: types.enumeration(DAYS),
    shortTitle: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
    speakers: types.array(types.reference(SpeakerModel)),
    menuItems: types.maybeNull(types.array(types.string)),
    sponsor: types.maybeNull(types.string),
    eventType: types.enumeration([
      "talk",
      "announcement",
      "meal",
      "workshop",
      "welcome",
      "goodbye",
      "break",
      "panel",
      "afterparty",
    ]),
    location: types.maybeNull(types.string),
    track: types.maybeNull(types.enumeration(["BEGINNER", "INTERMEDIATE", "ADVANCED"])),
    prerequisites: types.maybeNull(types.array(types.string)),
  })
  .views((event) => ({
    get screenTitle() {
      return event.shortTitle || event.title
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type EventType = Instance<typeof EventModel>
export interface Event extends EventType {}
type EventSnapshotType = SnapshotOut<typeof EventModel>
export interface EventSnapshot extends EventSnapshotType {}
export const createEventDefaultModel = () => types.optional(EventModel, {})
