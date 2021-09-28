import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  TextStyle,
  ViewStyle,
} from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, getScreenWidth, palette, spacing } from "../../theme"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/core"
import { calculateImageDimensions } from "./image-dimension-helpers"
import { RenderEventType } from "./render-event-type"

const ROOT: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.large,
}

const AFTER_PARTY_DESCRIPTION: TextStyle = { marginTop: spacing.small }

const TAB_HOLDER: ViewStyle = { flex: 1 }
const TAB_STYLE: ViewStyle = { paddingVertical: 7, alignItems: "center", justifyContent: "center" }
const TAB_CONTAINER: ViewStyle = { flexDirection: "row" }
const WHITE_TEXT: TextStyle = { color: "white" }
const COMMENT_TEXT: TextStyle = { ...WHITE_TEXT, fontSize: 16, marginTop: 4 }
const FLEX_ONE: ViewStyle = { flex: 1 }
const FLEX_ROW: ViewStyle = { flexDirection: "row" }
const COMMENT_CONTAINER: ViewStyle = { paddingVertical: 15, marginBottom: spacing.huge }
const COMMENT_STYLE: ViewStyle = {
  paddingBottom: 15,
  paddingTop: 20,
  paddingHorizontal: 20,
  borderTopWidth: 1,
  borderColor: "rgba(255, 255, 255, .1)",
}
const CREATED_BY: TextStyle = { color: "white", fontWeight: "600" }
const CREATED_AT: TextStyle = {
  color: "rgba(255, 255, 255, .5)",
  fontSize: 11,
  marginLeft: 8,
  marginTop: 3,
}
const INPUT_CONTAINER: ViewStyle = {
  bottom: 0,
  position: "absolute",
  left: 0,
  backgroundColor: color.background,
}
const MESSAGE_INPUT: ViewStyle = {
  backgroundColor: "white",
  height: 50,
  paddingHorizontal: 8,
  flex: 1,
}
const REPORT: TextStyle = { marginTop: 5, color: palette.angry, fontSize: 11 }
const CODE_OF_CONDUCT_LINK: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
  borderTopWidth: 1,
  borderColor: "rgba(255, 255, 255, .1)",
}
const SEND_BUTTON_TEXT: TextStyle = { paddingHorizontal: spacing.small }
const SEND_BUTTON: ViewStyle = { paddingHorizontal: spacing.small, borderRadius: 0 }
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
