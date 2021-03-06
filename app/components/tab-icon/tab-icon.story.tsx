import React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TabIcon } from "./tab-icon"

storiesOf("TabIcon", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <TabIcon routeName="schedule" />
      </UseCase>
    </Story>
  ))
