import * as React from "react"
import { Image, TextProps, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { spacing } from "../../theme"

const ROOT: ViewStyle = {
  marginTop: spacing.extraLarge,
  flexDirection: "row",
}

const TEXT: TextStyle = {
  marginLeft: spacing.large,
  paddingVertical: spacing.tiny,
}

const presets = {
  rideShare: require("./Car.png"),
  massTransit: require("./Lightrail.png"),
}

type TravelOptionPresets = keyof typeof presets
interface TravelOptionProps extends TextProps {
  preset?: TravelOptionPresets
}

export const TravelOption = (props: TravelOptionProps) => {
  const { preset } = props
  return (
    <View style={ROOT}>
      <Image source={presets[preset]} />
      <Text preset="sectionHeader" tx={`venueScreen.gettingToChainReact.${preset}` as const} style={TEXT} />
    </View>
  )
}
