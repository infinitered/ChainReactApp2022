import { EventStoreModel } from "./event-store"

test("can be created", () => {
  const instance = EventStoreModel.create({})

  expect(instance).toBeTruthy()
})
