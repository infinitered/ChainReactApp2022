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

const SPONSOR_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.small,
}

const SPONSORED_BY: TextStyle = { color: palette.offWhite }

const SPONSOR_NAME: TextStyle = { fontWeight: "500" }

const DESCRIPTION: TextStyle = { marginTop: spacing.large + spacing.tiny + spacing.tiny }

const MENU_ITEM: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.large,
  width: "100%",
}

const MENU_ITEM_TEXT: TextStyle = { color: palette.white }

const LABEL: TextStyle = {
  marginTop: spacing.extraLarge + spacing.large,
  color: palette.shamrock,
  marginBottom: spacing.large,
}

const BULLET: ViewStyle = {
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: palette.shamrock,
  marginRight: spacing.small,
  marginTop: spacing.small,
}

type RenderMealProps = { event: Event }
export const RenderMeal = (props: RenderMealProps) => {
  const { sponsor, description, menuItems, title, image } = props.event

  const imageDimensions = calculateImageDimensions(getScreenWidth())

  return (
    <View style={FULL_SIZE}>
      <Image source={{ uri: image }} style={{ ...FULL_WIDTH_IMAGE, ...imageDimensions }} />
      <Text text={title} preset="body" style={TITLE} />
      {sponsor && (
        <View style={SPONSOR_CONTAINER}>
          <Text tx="talkDetailsScreen.sponsoredBy" preset="input" style={SPONSORED_BY} />
          <Text text={sponsor} preset="input" style={SPONSOR_NAME} />
        </View>
      )}
      <Text text={description} preset="body" style={DESCRIPTION} />
      <Text preset="sectionHeader" tx="talkDetailsScreen.menuTitle" style={LABEL} />
      {menuItems.map((item, index) => (
        <View key={index} style={MENU_ITEM}>
          <View style={BULLET} />
          <Text preset="subheader" text={item} style={MENU_ITEM_TEXT} />
        </View>
      ))}
    </View>
  )
}
