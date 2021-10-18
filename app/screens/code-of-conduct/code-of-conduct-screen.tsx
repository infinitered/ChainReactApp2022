import { useNavigation } from "@react-navigation/core"
import React, { useLayoutEffect } from "react"
import { TextStyle, ViewStyle } from "react-native"
// import { BackButton } from "../../components/back-button"
import { Contact } from "../../components/contact/contact"
import { Screen } from "../../components/screen/screen"
import { Text } from "../../components/text/text"
import { color, spacing } from "../../theme"
import { palette } from "../../theme/palette"

const ROOT: ViewStyle = {
  marginHorizontal: spacing.large,
  paddingBottom: spacing.huge,
}

const TITLE: TextStyle = {
  marginTop: spacing.extraLarge,
  letterSpacing: 1.68,
}

const SECTION: TextStyle = {
  marginVertical: spacing.medium,
}

const SECTION_TITLE: TextStyle = {
  fontWeight: "500",
  letterSpacing: 3.0,
  fontSize: 14,
  color: color.palette.shamrock,
  marginTop: spacing.medium,
}

const email = "conf@infinite.red"
const twitter = "chainreactconf"
const phoneNumber = "(360) 450-4752"

export const CodeOfConductScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Code of Conduct" })
  }, [navigation])

  return (
    <Screen style={ROOT} preset="scroll" backgroundColor={palette.portGore}>
      <Text preset="header" tx="codeOfConductScreen.title" style={TITLE} />
      <Text preset="body" tx="codeOfConductScreen.intro" style={SECTION} />
      <Contact phoneNumber={phoneNumber} email={email} twitter={twitter} />
      <Text preset="body" style={SECTION_TITLE} tx={"codeOfConductScreen.quickVersionTitle"} />
      <Text preset="body" style={SECTION} tx={"codeOfConductScreen.quickVersion"} />
      <Text preset="body" style={SECTION_TITLE} tx={"codeOfConductScreen.lessQuickTitle"} />
      <Text preset="body" style={SECTION} tx={"codeOfConductScreen.lessQuickVersion"} />
    </Screen>
  )
}
