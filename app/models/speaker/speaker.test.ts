import { SpeakerModel } from "./speaker"

test("can be created", () => {
  const instance = SpeakerModel.create({})

  expect(instance).toBeTruthy()
})
