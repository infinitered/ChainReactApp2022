import { TalkStoreModel } from "./talk-store"

test("can be created", () => {
  const instance = TalkStoreModel.create({})

  expect(instance).toBeTruthy()
})
