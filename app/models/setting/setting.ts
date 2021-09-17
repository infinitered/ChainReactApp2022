import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SettingModel = types
  .model("Setting")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SettingType = Instance<typeof SettingModel>
export interface Setting extends SettingType {}
type SettingSnapshotType = SnapshotOut<typeof SettingModel>
export interface SettingSnapshot extends SettingSnapshotType {}
export const createSettingDefaultModel = () => types.optional(SettingModel, {})
