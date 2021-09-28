import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { SpeakerBio, SpeakerImage, Text } from "../../components"
import { Event } from "../../models"
import { spacing, textSizes } from "../../theme"

const FULL_SIZE: ViewStyle = {
  width: "100%",
  height: "100%",
}

const PANEL_BIO: ViewStyle = {
  flex: 1,
  marginTop: spacing.extraLarge + spacing.large,
}

const TITLE: TextStyle = {
  fontSize: textSizes.title,
}

const DESCRIPTION: TextStyle = {
  marginTop: spacing.large + spacing.tiny + spacing.tiny,
}

type RenderAnnouncementProps = { event: Event }
export const RenderAnnouncement = (props: RenderAnnouncementProps) => {
  const { title, description, speakers } = props.event
  return (
    <View style={FULL_SIZE}>
      <Text text={title} preset="body" style={TITLE} />
      <Text text={description} preset="body" style={DESCRIPTION} />
      {speakers &&
        speakers.length &&
        speakers.map((speaker, index) => {
          const isLast = index === speakers.length - 1
          return (
            <View key={index} style={PANEL_BIO}>
              <SpeakerImage speaker={speaker} />
              <SpeakerBio speaker={speaker} last={isLast} />
            </View>
          )
        })}
    </View>
  )
}
