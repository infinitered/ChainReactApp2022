import React from "react"
import { View, ViewStyle, Image, TextStyle, ImageStyle } from "react-native"
import { Text } from "../text/text"
import { palette, spacing } from "../../theme"

const ROOT: ViewStyle = {
  flexDirection: "row",
  backgroundColor: palette.portGore,
  padding: spacing.large + spacing.tiny,
}

const BACK_BUTTON: ImageStyle = {
  width: 15,
  height: 15,
}

const TITLE: TextStyle = {}

export type TitleBarProps = {
  title: string
}

export function TitleBar(props: TitleBarProps) {
  return (
    <View style={ROOT}>
      <Image source={require("./icon.back-arrow.png")} style={BACK_BUTTON} />
      <Text text={props.title} style={TITLE} />
    </View>
  )
}
