import React from "react"
import { View, ViewStyle } from "react-native"
import Hyperlink from "react-native-hyperlink"
import { SpeakerBio, TalkTitle, Text } from "../../components"
import { SpeakerImage } from "../../components/speaker-image/speaker-image"
import { Event } from "../../models"
import { palette, spacing } from "../../theme"

const FULL_SIZE: ViewStyle = {
  width: "100%",
  height: "100%",
}

type RenderTalkProps = { event: Event }

export const RenderTalk = ({ event }: RenderTalkProps) => {
  return (
    <View style={FULL_SIZE}>
      {event.speakers && <SpeakerImage speaker={event.speakers[0]} />}
      <TalkTitle event={event} />
      {event.description && (
        <Hyperlink
          linkDefault={true}
          linkStyle={{ color: palette.shamrock, textDecorationLine: "underline" }}
        >
          <Text preset="body" style={{ fontSize: 16, marginTop: spacing.large }}>
            {event.description}
          </Text>
        </Hyperlink>
      )}
      {event.speakers && <SpeakerBio speaker={event.speakers[0]} />}
    </View>
  )
}
