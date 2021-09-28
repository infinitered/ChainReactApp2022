import React from "react"
import { Linking, TextStyle, TouchableOpacity } from "react-native"
import { Text } from ".."
import { color } from "../../theme"

const DIRECTIONS: TextStyle = {
  fontSize: 11,
  lineHeight: 13,
  color: color.palette.white,
  letterSpacing: 2,
  fontWeight: "500",
}

type RenderLinkProps = {
  link: string
}
export const RenderLink = ({ link }: RenderLinkProps) => {
  const openLink = () => {
    Linking.canOpenURL(link).then((supported) => {
      if (!supported) return
      Linking.openURL(link)
    })
  }
  return (
    <TouchableOpacity onPress={openLink}>
      <Text style={DIRECTIONS} tx="venueScreen.nearbyAttractions.navigation.getDirections" />
    </TouchableOpacity>
  )
}
