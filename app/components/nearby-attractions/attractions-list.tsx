import React, { useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { getScreenWidth, palette, spacing } from "../../theme"
import { Attraction } from "./attraction"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: 17,
  paddingBottom: spacing.large + spacing.small,
}
const NAV: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const NAV_ITEM: ViewStyle = {
  // paddingRight: spacing.large,
  paddingVertical: spacing.small,
}
const SELECTED_NAV_ITEM: TextStyle = {
  color: palette.shamrock,
}
const LIST: ViewStyle = {
  marginTop: spacing.medium,
}

export type AttractionsList = "food" | "drink" | "coffee" | "sights" | "hotels"

export const AttractionsList = () => {
  const {
    eventStore: { attractions },
  } = useStores()
  const [selectedType, setSelectedType] = useState<AttractionsList>("food")

  return (
    <View style={{ ...ROOT, ...{ width: getScreenWidth() } }}>
      <View style={NAV}>
        <TouchableOpacity style={NAV_ITEM} onPress={() => setSelectedType("food")}>
          <Text
            preset="label"
            tx="venueScreen.nearbyAttractions.navigation.food"
            style={selectedType === "food" ? SELECTED_NAV_ITEM : {}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={NAV_ITEM} onPress={() => setSelectedType("drink")}>
          <Text
            preset="label"
            tx="venueScreen.nearbyAttractions.navigation.drink"
            style={selectedType === "drink" ? SELECTED_NAV_ITEM : {}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={NAV_ITEM} onPress={() => setSelectedType("coffee")}>
          <Text
            preset="label"
            tx="venueScreen.nearbyAttractions.navigation.coffee"
            style={selectedType === "coffee" ? SELECTED_NAV_ITEM : {}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={NAV_ITEM} onPress={() => setSelectedType("sights")}>
          <Text
            preset="label"
            tx="venueScreen.nearbyAttractions.navigation.sights"
            style={selectedType === "sights" ? SELECTED_NAV_ITEM : {}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={NAV_ITEM} onPress={() => setSelectedType("hotels")}>
          <Text
            preset="label"
            tx="venueScreen.nearbyAttractions.navigation.hotels"
            style={selectedType === "hotels" ? SELECTED_NAV_ITEM : {}}
          />
        </TouchableOpacity>
      </View>
      <View style={LIST}>
        {attractions[selectedType].map((attraction) => (
          <Attraction attraction={attraction} key={attraction.id} />
        ))}
      </View>
    </View>
  )
}
