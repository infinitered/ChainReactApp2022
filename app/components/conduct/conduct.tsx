import React from "react"
import { TextStyle, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { Button } from "../button/button"
import { palette, spacing } from "../../theme"

const ROOT: ViewStyle = {
  marginTop: spacing.huge,
  paddingHorizontal: spacing.large,
}

const HEADER: TextStyle = {
  color: palette.white,
}
const BODY: TextStyle = {
  marginTop: spacing.medium,
  marginBottom: spacing.medium,
}

export function Conduct(props: TouchableOpacityProps) {
  return (
    <View style={ROOT}>
      <Text preset="header" tx="infoScreen.conduct.title" style={HEADER} />
      <Text preset="body" tx="infoScreen.conduct.description" style={BODY} />
      <Button text="VIEW CODE OF CONDUCT" preset="dark" onPress={props.onPress} />
    </View>
  )
}
