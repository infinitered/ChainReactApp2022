import React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ScheduleNav } from "./schedule-nav"

storiesOf("ScheduleNav", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ScheduleNav selected="friday" onSelected={() => {}} />
      </UseCase>
    </Story>
  ))
