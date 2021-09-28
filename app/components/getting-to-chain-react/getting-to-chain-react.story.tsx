import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { GettingToChainReact } from "./getting-to-chain-react"

storiesOf("GettingToChainReact", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <GettingToChainReact style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
