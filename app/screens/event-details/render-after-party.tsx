import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { Event } from "../../models"
import { getScreenWidth, palette, spacing } from "../../theme"
import { calculateImageDimensions } from "./image-dimension-helpers"

const FULL_SIZE: ViewStyle = {
  width: "100%",
  height: "100%",
}

const FULL_WIDTH_IMAGE: ImageStyle = {
  resizeMode: "contain",
}

const TITLE: TextStyle = {
  fontSize: 20,
  color: palette.white,
  marginTop: spacing.large,
}

const AFTER_PARTY_DESCRIPTION: TextStyle = { marginTop: spacing.small }

type RenderAfterPartyProps = { event: Event }
export const RenderAfterParty = (props: RenderAfterPartyProps) => {
  const { title, description, sponsor, location } = props.event
  const imageDimensions = calculateImageDimensions(getScreenWidth())

  let image = null
  switch (sponsor) {
    case "Squarespace":
      image = require("./images/img.afterparty-squarespace.png")
      break
    case "Bumped":
      image = require("./images/bumped.png")
      break
    case "G2i":
      image = require("./images/img.afterparty-g2i.png")
      break
    default:
      image = require("./images/img.afterparty-g2i.png")
      break
  }

  return (
    <View style={FULL_SIZE}>
      <View>
        <Image source={image} style={{ ...FULL_WIDTH_IMAGE, ...imageDimensions }} />
      </View>
      <Text text={title} preset="body" style={TITLE} />
      <Text text={description} preset="body" style={AFTER_PARTY_DESCRIPTION} />
      {location && (
        <Text
          style={{ color: palette.shamrock, marginTop: spacing.large, fontSize: 14 }}
          preset="subheader"
          text="LOCATION"
        />
      )}
      {location && <Text text={location} preset="body" style={AFTER_PARTY_DESCRIPTION} />}
    </View>
  )
}
