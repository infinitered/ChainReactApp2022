import React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { palette, spacing } from "../../theme"
import { EVENT_DAYS } from "../../models"

const NAV_WRAPPER: ViewStyle = {
  flexDirection: "row",
}

const NAV_BUTTON: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: palette.lightGrey,
  paddingTop: spacing.large,
  paddingBottom: spacing.medium,
  borderRightColor: palette.offWhite,
  borderRightWidth: 1,
}

const NAV_BUTTON_SELECTED: ViewStyle = {
  backgroundColor: palette.shamrock,
}

const NAV_BUTTON_LAST: ViewStyle = {
  borderRightWidth: 0,
}

const NAV_TEXT: TextStyle = {
  color: palette.haiti,
}

type ScheduleNavProps = {
  selected: EVENT_DAYS
  onSelected: (selected: EVENT_DAYS) => void
}
export const ScheduleNav = ({ selected, onSelected }: ScheduleNavProps) => {
  return (
    <View style={NAV_WRAPPER}>
      <TouchableOpacity
        style={[NAV_BUTTON, selected === "wednesday" && NAV_BUTTON_SELECTED]}
        onPress={() => onSelected("wednesday")}
      >
        <Text tx="scheduleScreen.nav.wednesday" style={NAV_TEXT} preset="sectionHeader" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[NAV_BUTTON, selected === "thursday" && NAV_BUTTON_SELECTED]}
        onPress={() => onSelected("thursday")}
      >
        <Text tx="scheduleScreen.nav.thursday" style={NAV_TEXT} preset="sectionHeader" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[NAV_BUTTON, selected === "friday" && NAV_BUTTON_SELECTED, NAV_BUTTON_LAST]}
        onPress={() => onSelected("friday")}
      >
        <Text tx="scheduleScreen.nav.friday" style={NAV_TEXT} preset="sectionHeader" />
      </TouchableOpacity>
    </View>
  )
}
