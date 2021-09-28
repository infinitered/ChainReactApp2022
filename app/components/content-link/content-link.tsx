import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { Button } from "../button/button"
import { palette, spacing } from "../../theme"
import { TxKeyPath } from "../../i18n"

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

export function ContentLink(props: {
  headerTx: TxKeyPath
  bodyTx: TxKeyPath
  buttonTx: TxKeyPath
  style?: ViewStyle
  onPressLink: () => void
}) {
  return (
    <View style={{ ...ROOT, ...props.style }}>
      <Text preset="header" tx={props.headerTx} style={HEADER} />
      <Text preset="body" tx={props.bodyTx} style={BODY} />
      <Button tx={props.buttonTx} preset="dark" onPress={props.onPressLink} />
    </View>
  )
}
