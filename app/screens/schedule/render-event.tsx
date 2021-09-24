import React from "react"
import { useNavigation } from "@react-navigation/core"
import { ScheduleCell } from "../../components"
import { ScheduleCellPresetNames } from "../../components/schedule-cell/schedule-cell.presets"
import { Event } from "../../models"

type RenderEventProps = { event: Event; index: number }
export const RenderEvent = ({ event, index }: RenderEventProps) => {
  const navigation = useNavigation()

  const eventType = event.eventType.toLowerCase()
  const cellPreset: ScheduleCellPresetNames =
    eventType === "break" || eventType === "afterparty" ? eventType : "default"
  console.log("this is a event item::::::: ", event)
  return (
    <ScheduleCell
      index={index}
      event={event}
      preset={cellPreset}
      onPress={(event: Event) => {
        navigation.navigate("eventDetails")
        // TODO set current event...
      }}
      key={index}
    />
  )
}
