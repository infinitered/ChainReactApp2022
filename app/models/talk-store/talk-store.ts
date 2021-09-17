import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TalkModel } from "../talk/talk"
import { SettingModel } from "../setting/setting"

/**
 * This holds all talks for the conference, as well as the
 * API status and settings.
 */
export const TalkStoreModel = types
  .model("TalkStore")
  .props({
    talks: types.optional(types.array(TalkModel), []),
    status: types.optional(types.enumeration(["pending", "done", "error"]), "done"),
    updatedAt: types.maybe(types.Date),
    settings: types.optional(types.array(SettingModel), []),
  })
  .views((store) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TalkStoreType = Instance<typeof TalkStoreModel>
export interface TalkStore extends TalkStoreType {}
type TalkStoreSnapshotType = SnapshotOut<typeof TalkStoreModel>
export interface TalkStoreSnapshot extends TalkStoreSnapshotType {}
export const createTalkStoreDefaultModel = () => types.optional(TalkStoreModel, {})
