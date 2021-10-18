import React, { useState, useLayoutEffect } from "react"
import { TextStyle } from "react-native"
import { Text } from "../../components/text/text"
import { Screen } from "../../components/screen/screen"
import { palette, spacing } from "../../theme"
import { PresentedBy } from "../../components/presented-by/presented-by"
import { WiFi } from "../../components/wi-fi/wi-fi"
import { Conduct } from "../../components/conduct/conduct"
import { Sponsors } from "../../components/sponsors/sponsors"
import { SurveyLink } from "../../components/survey-link/survey-link"
import { useNavigation } from "@react-navigation/core"

const TITLE: TextStyle = {
  marginTop: spacing.extraLarge,
  marginLeft: spacing.large,
}

export const InfoScreen = () => {
  const [renderFullContent, setRenderFullContent] = useState(false)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setRenderFullContent(true)
    })

    navigation.setOptions({ title: "Info" })
  }, [navigation])

  return (
    <Screen preset="scrollStack" backgroundColor={palette.portGore}>
      <Text preset="title" tx="infoScreen.title" style={TITLE} />
      <WiFi />
      <Conduct onPress={() => navigation.navigate("infoCodeOfConduct")} />
      <SurveyLink />
      {renderFullContent ? <Sponsors /> : null}
      <PresentedBy />
    </Screen>
  )
}
