import * as React from "react"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Event } from "../../models"
import { palette, spacing, textSizes } from "../../theme"
import { BulletItem } from "../bullet-item/bullet-item"
import { Text } from "../text/text"

const ROOT: ViewStyle = {
  width: "100%",
}

const LABEL: TextStyle = {
  marginTop: spacing.extraLarge + spacing.large,
  color: palette.shamrock,
  marginBottom: spacing.large,
}

const TITLE: TextStyle = {
  fontSize: textSizes.title,
}

function mapsURL(location: string): string {
  const label = location.split("\n")[0]
  const query = location.split("\n").slice(1).join(" ")
  const url = Platform.select({
    ios: `maps:0,0?q=${label}@${query}`,
    android: `geo:0,0?q=${query}(${label})`,
  })
  return url
}

type TalkTitleProps = { event: Event }

export function TalkTitle(props: TalkTitleProps) {
  const { eventType, duration, title, location, description, prerequisites } = props.event

  switch (eventType.toLowerCase()) {
    case "talk":
      return (
        <View style={ROOT}>
          <Text text={duration} preset="sectionHeader" style={LABEL} />
          <Text text={title} preset="header" style={TITLE} />
        </View>
      )
    case "workshop":
      return (
        <View style={ROOT}>
          <Text tx="talkDetailsScreen.workshop" preset="sectionHeader" style={LABEL} />
          <Text text={title} preset="header" style={TITLE} />
          <Text tx="talkDetailsScreen.location" preset="sectionHeader" style={LABEL} />
          <Text
            text={location}
            preset="subheader"
            style={{ color: palette.white, fontWeight: "500" }}
            onPress={() => Linking.openURL(mapsURL(location))}
          />
          <Text tx="talkDetailsScreen.aboutWorkshop" preset="sectionHeader" style={LABEL} />
          <Text text={description} preset="body" />
          {prerequisites && (
            <Text tx="talkDetailsScreen.prerequisites" preset="sectionHeader" style={LABEL} />
          )}
          {prerequisites &&
            prerequisites.map((prerequisite, index) => (
              <BulletItem text={prerequisite} key={index} />
            ))}
        </View>
      )
    default:
      return null
  }
}
