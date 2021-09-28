import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from ".."
import { Event } from "../../models"
import { ScheduleCellPresets } from "./schedule-cell.presets"

type RenderTimeProps = {
  preset: keyof typeof ScheduleCellPresets
  event: Event
}

export const RenderTime = (props: RenderTimeProps) => {
  const { preset, event } = props
  const style: any = ScheduleCellPresets[preset] || ScheduleCellPresets.default
  const label = `${event.startTime}`

  return (
    <View style={style.timeWrapper as ViewStyle}>
      {event.track && <Text preset="label" text={event.track} style={style.track} />}
      <Text preset="label" text={label} style={style.time as TextStyle} />
    </View>
  )
}
