import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ContentLink } from "./content-link"

storiesOf("ContentLink", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ContentLink
          onPressLink={() => {}}
          headerTx="venueScreen.blog.title"
          bodyTx="venueScreen.blog.description"
          buttonTx="venueScreen.blog.button"
        />
      </UseCase>
    </Story>
  ))
