import { SpeakerModel } from "./speaker"

test("can be created", () => {
  const instance = SpeakerModel.create({
    id: "asdfd",
  })

  expect(instance).toBeTruthy()
})
