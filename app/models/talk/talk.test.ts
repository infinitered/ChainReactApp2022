import { TalkModel } from "./talk"

test("can be created", () => {
  const instance = TalkModel.create({})

  expect(instance).toBeTruthy()
})
