import { EventModel } from "./event"

test("can be created", () => {
  const instance = EventModel.create({
    id: "asdf",
  })

  expect(instance).toBeTruthy()
})
