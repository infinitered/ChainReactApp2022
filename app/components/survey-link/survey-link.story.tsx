import React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { SurveyLink } from "./survey-link"

storiesOf("SurveyLink", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SurveyLink style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
