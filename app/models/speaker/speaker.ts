import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Info for each speaker.
 */
export const SpeakerModel = types
  .model("Speaker")
  .props({
    id: types.identifier,
    name: types.maybeNull(types.string),
    employer: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
    facebook: types.maybeNull(types.string),
    github: types.maybeNull(types.string),
    twitter: types.maybeNull(types.string),
    medium: types.maybeNull(types.string),
    instagram: types.maybeNull(types.string),
    dribbble: types.maybeNull(types.string),
    websites: types.maybeNull(types.array(types.string)),
    bio: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SpeakerType = Instance<typeof SpeakerModel>
export interface Speaker extends SpeakerType {}
type SpeakerSnapshotType = SnapshotOut<typeof SpeakerModel>
export interface SpeakerSnapshot extends SpeakerSnapshotType {}
export const createSpeakerDefaultModel = () => types.optional(SpeakerModel, {})
