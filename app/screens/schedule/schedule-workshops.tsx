import React from "react"
import { useNavigation } from "@react-navigation/core"
import { TextStyle, View } from "react-native"
import { ScheduleCell, Text } from "../../components"
import { color, spacing } from "../../theme"
import { Event, useStores } from "../../models"
import { observer } from "mobx-react-lite"

const SUBTITLE: TextStyle = {
  color: color.palette.white,
  fontWeight: "600",
  paddingHorizontal: spacing.large,
  marginTop: spacing.small,
}
const DATE: TextStyle = {
  fontStyle: "italic",
  fontWeight: "400",
  paddingHorizontal: spacing.large,
  marginBottom: spacing.small + spacing.large,
}

export const ScheduleWorkshops = observer(() => {
  const { eventStore } = useStores()
  const navigation = useNavigation()

  const { events } = eventStore
  const beginnerWorkshop = events.find((event) => event.track === "BEGINNER")
  const intermediateWorkshop = events.find((event) => event.track === "INTERMEDIATE")
  const advancedWorkshop = events.find((event) => event.track === "ADVANCED")
  const welcomeParty = events.find((event) => event.eventType === "afterparty")
  const onPressWorkshop = (event: Event) => {
    eventStore.setCurrentEvent(event)
    navigation.navigate("eventDetails")
  }

  return (
    <View>
      <Text tx="scheduleScreen.workshops" style={SUBTITLE} preset="subheader" />
      <Text tx="scheduleScreen.workshopsDate" style={DATE} preset="label" />
      <ScheduleCell index={0} event={beginnerWorkshop} onPress={onPressWorkshop} />
      <ScheduleCell index={1} event={intermediateWorkshop} onPress={onPressWorkshop} />
      <ScheduleCell index={2} event={advancedWorkshop} onPress={onPressWorkshop} />
      <ScheduleCell
        index={3}
        preset={"afterparty"}
        event={welcomeParty}
        onPress={onPressWorkshop}
      />
    </View>
  )
})
