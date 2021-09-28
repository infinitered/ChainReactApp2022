import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Alert, KeyboardAvoidingView, Platform, ViewStyle } from "react-native"
import { Screen } from "../../components"
import { palette, spacing } from "../../theme"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"
import { RenderEventType } from "./render-event-type"

const ROOT: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.large,
}
const MAIN_CONTAINER: ViewStyle = { flex: 1, backgroundColor: palette.portGore }

export const EventDetailsScreen = observer(function EventDetailsScreen() {
  const { eventStore } = useStores()
  const { currentEvent } = eventStore
  const navigation = useNavigation()

  if (!currentEvent) {
    // render a fallback ... or navigate back
    Alert.alert("No current event set -- this is a bug!")
    navigation.navigate("schedule")
    return null
  }

  useEffect(() => {
    navigation.setOptions({ title: currentEvent.screenTitle })
  }, [currentEvent.screenTitle])

  return (
    <KeyboardAvoidingView
      style={MAIN_CONTAINER}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={88}
    >
      {/* <CodeOfConductLink onPress={this.linkToCodeOfConduct} style={CODE_OF_CONDUCT_LINK} /> */}

      <Screen preset="scroll" backgroundColor={palette.portGore} style={ROOT}>
        <RenderEventType event={currentEvent} />
      </Screen>
    </KeyboardAvoidingView>
  )
})
