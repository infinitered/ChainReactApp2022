import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SpeakerBio, SpeakerImage, Text } from "../../components"
import { Event } from "../../models"
import { getScreenWidth, palette, spacing } from "../../theme"
import { calculateImageDimensions } from "./image-dimension-helpers"

const FULL_SIZE: ViewStyle = {
  width: "100%",
  height: "100%",
}

const FULL_WIDTH_IMAGE: ImageStyle = {
  resizeMode: "contain",
}

const TITLE: TextStyle = {
  fontSize: 20,
  color: palette.white,
  marginTop: spacing.large,
}

const DESCRIPTION: TextStyle = { marginTop: spacing.large + spacing.tiny + spacing.tiny }

const PANEL_BIO: ViewStyle = { flex: 1, marginTop: spacing.extraLarge + spacing.large }

type RenderPanelProps = { event: Event }
export const RenderPanel = (props: RenderPanelProps) => {
  const { image, title, description, speakers } = props.event

  const imageDimensions = calculateImageDimensions(getScreenWidth())

  return (
    <View style={FULL_SIZE}>
      {<Image source={{ uri: image }} style={{ ...FULL_WIDTH_IMAGE, ...imageDimensions }} />}
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
