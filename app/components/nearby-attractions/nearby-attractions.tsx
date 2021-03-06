import React from "react"
import { View, ViewStyle } from "react-native"
import { getScreenWidth, palette, spacing } from "../../theme"
import { AttractionsList } from "./attractions-list"
import { AttractionsMap } from "./attractions-map"

const ROOT: ViewStyle = {
  paddingTop: spacing.large,
  backgroundColor: palette.portGoreLight,
}

export const NearbyAttractions = () => {
  const fullWidth = {
    width: getScreenWidth(),
  }
  return (
    <View style={{ ...ROOT, ...fullWidth }}>
      <AttractionsList />
      <AttractionsMap />
    </View>
  )
}
