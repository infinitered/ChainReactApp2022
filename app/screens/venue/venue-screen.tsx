import React, { useState, useEffect, useRef } from "react"
import { ImageStyle, Linking, TextStyle, ViewStyle } from "react-native"
import { Text } from "../../components/text/text"
import { Screen } from "../../components/screen/screen"
import { palette, spacing } from "../../theme"
import { GerdingTheater } from "../../components/gerding-theater/gerding-theater"
import { GettingToChainReact } from "../../components/getting-to-chain-react/getting-to-chain-react"
import { NearbyAttractions } from "../../components/nearby-attractions/nearby-attractions"
import { ContentLink } from "../../components/content-link/content-link"
import AnimatedLottieView from "lottie-react-native"

const BLOG_LINK: ViewStyle = {
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
  marginBottom: spacing.huge,
}

const TITLE: TextStyle = {
  marginTop: spacing.extraLarge,
  marginLeft: spacing.large,
}

const SUNSET: ImageStyle = {
  width: "30%",
  alignSelf: "center",
}

const BlogLink = () => (
  <ContentLink
    style={BLOG_LINK}
    headerTx="venueScreen.blog.title"
    bodyTx="venueScreen.blog.description"
    buttonTx="venueScreen.blog.button"
    onPressLink={() =>
      Linking.openURL(
        "https://shift.infinite.red/an-insiders-guide-to-the-best-spots-in-portland-ce84e316bfc9",
      )
    }
  />
)

export const VenueScreen = () => {
  const [renderFullContent, setRenderFullContent] = useState(false)
  const sunsetRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      setRenderFullContent(true)
    })

    sunsetRef.current.play()

    return () => sunsetRef.current.reset()
  }, [])

  return (
    <Screen preset="scroll" backgroundColor={palette.portGore}>
      <Text preset="title" tx="venueScreen.title" style={TITLE} />
      <GerdingTheater />
      <GettingToChainReact />
      <BlogLink />
      <AnimatedLottieView
        style={SUNSET}
        ref={sunsetRef}
        source={require("./animations/sunset.json")}
      />
      {renderFullContent ? <NearbyAttractions /> : null}
    </Screen>
  )
}
