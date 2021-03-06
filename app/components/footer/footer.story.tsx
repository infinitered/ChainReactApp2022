import React from "react"
import { storiesOf } from "@storybook/react-native"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Footer } from "./footer"
import { Text } from "../text/text"

storiesOf("Footer", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Presets", () => (
    <Story>
      <UseCase text="default" usage="Footer" noPad>
        <Footer />
      </UseCase>
      <UseCase text="default" usage="Footer with content" noPad>
        <Footer>
          <Text preset="body" text="Footer Content" />
        </Footer>
      </UseCase>
    </Story>
  ))
