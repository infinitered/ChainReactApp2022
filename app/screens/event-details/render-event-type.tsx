import React from "react"
import { Event } from "../../models"
import { RenderBreak } from "./render-break"
import { RenderTalk } from "./render-talk"
import { RenderWorkshop } from "./render-workshop"

type RenderEventTypeProps = {
  event: Event
}
export const RenderEventType = ({ event }: RenderEventTypeProps) => {
  switch (event.eventType.toLowerCase()) {
    case "talk":
      return <RenderTalk event={event} />
    case "workshop":
      return <RenderWorkshop event={event} />
    case "break":
      return <RenderBreak event={event} />
    // case "lunch":
    // case "breakfast":
    //   return <RenderLunch />
    // case "panel":
    //   return <RenderPanel />
    // case "welcome":
    // case "goodbye":
    //   return <RenderWelcome />
    // case "afterparty":
    //   return <RenderAfterParty />
    default:
      return null
  }
}
