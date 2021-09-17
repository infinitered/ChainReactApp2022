import { SettingModel } from "./setting"

test("can be created", () => {
  const instance = SettingModel.create({})

  expect(instance).toBeTruthy()
})
