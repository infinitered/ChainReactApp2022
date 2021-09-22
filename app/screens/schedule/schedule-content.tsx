import React from "react"
import { isFriday, isThursday } from "date-fns"
import { convertToTimeZone } from "date-fns-timezone"
import { TextStyle, View } from "react-native"
import { Text } from "../../components"
import { Event, EventStore, EVENT_DAYS } from "../../models"
import { color, spacing } from "../../theme"
import { TIMEZONE } from "../../utils/info"
import { RenderEvent } from "./render-event"

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

type ScheduleContentProps = {
  eventStore: EventStore
  selected: EVENT_DAYS
}
export const ScheduleContent = ({ eventStore, selected }: ScheduleContentProps) => {
  const selectedEvents = eventStore.eventsForDay(selected || "wednesday")

  return (
    <View>
      <Text
        tx={`scheduleScreen.${selected === "thursday" ? "day1" : "day2"}`}
        style={SUBTITLE}
        preset="subheader"
      />
      <Text
        tx={`scheduleScreen.${selected === "thursday" ? "day1" : "day2"}Date`}
        style={DATE}
        preset="label"
      />
      {selectedEvents &&
        selectedEvents.map((event, index) => <RenderEvent event={event} index={index} />)}
    </View>
  )
}
