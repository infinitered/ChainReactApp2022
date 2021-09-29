import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import {
  SponsorLogoSizePresetNames,
  sponsorLogoSizePresets,
  SponsorNames,
  sponsors,
} from "./sponsor-logo.presets"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  flexDirection: "column",
  width: "50%",
  alignItems: "center",
}

const SUBTITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "600",
  letterSpacing: 3.0,
  color: color.palette.shamrock,
}

export type SponsorLogoProps = {
  size?: SponsorLogoSizePresetNames
  sponsor?: SponsorNames
  style?: ImageStyle
  subtitle?: string
}

export const SponsorLogo = (props: SponsorLogoProps) => {
  const { size, sponsor, style, subtitle } = props
  if (!subtitle) {
    return (
      <Image source={sponsors[sponsor]} style={{ ...sponsorLogoSizePresets[size], ...style }} />
    )
  } else {
    return (
      <View style={ROOT}>
        <Image
          source={sponsors[sponsor]}
          style={{ ...sponsorLogoSizePresets[size], ...style, marginBottom: 0 }}
        />
        {subtitle && <Text style={SUBTITLE} text={subtitle} />}
      </View>
    )
  }
}
