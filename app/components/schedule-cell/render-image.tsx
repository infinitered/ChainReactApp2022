import React from "react"
import { Image, ImageStyle } from "react-native"
import { Event } from "../../models"
import { ScheduleCellPresets } from "./schedule-cell.presets"

type RenderImageProps = {
  preset: keyof typeof ScheduleCellPresets
  event: Event
}
export const RenderImage = (props: RenderImageProps) => {
  const {
    preset,
    event: { sponsor, eventType, speakers },
    event,
  } = props

  const style: any = ScheduleCellPresets[preset] || ScheduleCellPresets.default
  let image = null

  if (eventType === "panel") {
    image = require("./images/panelist.png")
  } else if (eventType === "afterparty") {
    if (sponsor === "G2i") image = require("./images/afterparty-G2i.png")
    if (sponsor === "Bumped") image = require("./images/sponsor-bumped.png")
  } else if (eventType === "break") {
    image = require("./images/coffee-small.png")
  } else if (["talk", "workshop", "welcome", "goodbye"].includes(eventType)) {
    image = speakers && speakers[0] && speakers[0].image ? { uri: speakers[0].image } : null
  } else if (eventType === "lunch") {
    image = require("./images/lunch.png")
  } else if (eventType === "breakfast") {
    image = require("./images/registration.png")
  } else {
    if (event.image) image = { uri: event.image }
  }
  if (image) {
    return <Image source={image} style={style.image as ImageStyle} />
  } else {
    return null
  }
}
