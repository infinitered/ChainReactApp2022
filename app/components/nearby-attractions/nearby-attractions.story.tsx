import React from "react"
import { storiesOf } from "@storybook/react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { NearbyAttractions } from "./nearby-attractions"

storiesOf("NearbyAttractions", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <NearbyAttractions />
      </UseCase>
    </Story>
  ))
