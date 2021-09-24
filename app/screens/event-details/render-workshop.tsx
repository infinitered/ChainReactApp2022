import React from "react"
import { View, ViewStyle } from "react-native"
import { SpeakerBio, SpeakerImage, TalkTitle } from "../../components"
import { Event } from "../../models"

const FULL_SIZE: ViewStyle = {
  width: "100%",
  height: "100%",
}

type RenderWorkshopProps = { event: Event }

export function RenderWorkshop({ event }: RenderWorkshopProps) {
  return (
    <View style={FULL_SIZE}>
      <SpeakerImage speaker={event.speakers[0]} />
      <TalkTitle event={event} />
      <SpeakerBio speaker={event.speakers[0]} />
    </View>
  )
}
