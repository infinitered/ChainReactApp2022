import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { Event } from "../../models"
import { palette, spacing, textSizes } from "../../theme"

const FULL_SIZE: ViewStyle = {
  width: "100%",
  height: "100%",
}

const LABEL: TextStyle = {
  marginTop: spacing.extraLarge + spacing.large,
  color: palette.shamrock,
  marginBottom: spacing.large,
}

const TITLE: TextStyle = {
  fontSize: textSizes.title,
}

type RenderDefaultEventProps = { event: Event }

export function RenderDefaultEvent({ event }: RenderDefaultEventProps) {
  const { title, description } = event
  return (
    <View style={FULL_SIZE}>
      {/* <SpeakerImage speaker={event.speakers[0]} />
      <TalkTitle event={event} />
      <SpeakerBio speaker={event.speakers[0]} /> */}
      <Text text={"Unknown Event"} preset="sectionHeader" style={LABEL} />
      <Text text={title} preset="header" style={TITLE} />
      <Text text={description} preset="body" style={TITLE} />
    </View>
  )
}
