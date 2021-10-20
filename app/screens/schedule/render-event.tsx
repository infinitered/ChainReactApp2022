import React from "react"
import { useNavigation } from "@react-navigation/core"
import { ScheduleCell } from "../../components"
import { ScheduleCellPresetNames } from "../../components/schedule-cell/schedule-cell.presets"
import { Event, useStores } from "../../models"
import { observer } from "mobx-react-lite"

type RenderEventProps = { event: Event; index: number }
export const RenderEvent = observer(({ event, index }: RenderEventProps) => {
  const navigation = useNavigation()
  const { eventStore } = useStores()

  const eventType = event.eventType.toLowerCase()
  const cellPreset: ScheduleCellPresetNames =
    eventType === "break" || eventType === "afterparty" ? eventType : "default"

  return (
    <ScheduleCell
      index={index}
      event={event}
      preset={cellPreset}
      onPress={(event: Event) => {
        eventStore.setCurrentEvent(event)
        navigation.navigate("eventDetails")
      }}
      key={index}
    />
  )
})
