import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { palette, spacing } from "../../theme"

const TITLE: TextStyle = {
  marginTop: spacing.extraLarge,
  marginLeft: spacing.large,
}

export const VenueScreen = observer(function VenueScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="scroll" backgroundColor={palette.portGore}>
      <Text preset="header" tx="venueScreen.title" style={TITLE} />
    </Screen>
  )
})
