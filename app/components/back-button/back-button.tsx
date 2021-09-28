import * as React from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { HIT_SLOP, palette, spacing } from "../../theme"
import { Text } from "../text/text"

const HEADER_TEXT: TextStyle = {
  fontSize: 17,
  fontWeight: "600",
  lineHeight: 45,
  marginLeft: spacing.large,
  color: palette.shamrock,
}

const BACK_ARROW: ViewStyle = {
  flexDirection: "row",
  paddingLeft: spacing.large,
  alignItems: "center",
  justifyContent: "center",
}

export const BackButton = (props: { backTitle: string }) => {
  return (
    <View style={BACK_ARROW} hitSlop={HIT_SLOP}>
      <Image source={require("../title-bar/icon.back-arrow.png")} />
      <Text text={props.backTitle} style={HEADER_TEXT} />
    </View>
  )
}
