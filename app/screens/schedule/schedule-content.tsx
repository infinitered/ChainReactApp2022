import React from "react"
import { TextStyle, View } from "react-native"
import { Text } from "../../components"
import { EventStore, EVENT_DAYS } from "../../models"
import { color, spacing } from "../../theme"
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
        tx={
          `scheduleScreen.${selected === "thursday" ? "day1" : "day2"}` as
            | "scheduleScreen.day1"
            | "scheduleScreen.day2"
        }
        style={SUBTITLE}
        preset="subheader"
      />
      <Text
        tx={
          `scheduleScreen.${selected === "thursday" ? "day1" : "day2"}Date` as
            | "scheduleScreen.day1Date"
            | "scheduleScreen.day2Date"
        }
        style={DATE}
        preset="label"
      />
      {selectedEvents &&
        selectedEvents.map((event, index) => (
          <RenderEvent event={event} index={index} key={event.id} />
        ))}
    </View>
  )
}
