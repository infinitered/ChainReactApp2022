import { TalkModel } from "./talk"

test("can be created", () => {
  const instance = TalkModel.create({
    id: "asdf",
  })

  expect(instance).toBeTruthy()
})
