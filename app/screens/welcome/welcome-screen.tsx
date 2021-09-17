import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Footer, Screen, Text } from "../../components"
import { spacing, palette } from "../../theme"
import { NavigatorParamList } from "../../navigators"

const backgroundImage = require("./bg.welcome.png")

const ROOT: ViewStyle = { justifyContent: "space-between" }
const TOP_CONTAINER: ViewStyle = {
  marginTop: spacing.large,
}
const HEADER1: TextStyle = {
  paddingHorizontal: spacing.large,
  marginTop: spacing.large,
  color: palette.white,
}
const HEADER2: TextStyle = {
  marginBottom: 38,
  paddingHorizontal: spacing.large,
  color: palette.offWhite,
}
const SUBHEADER: TextStyle = {
  paddingHorizontal: spacing.large,
  color: palette.offWhite,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("tabs")

    return (
      <Screen
        preset="fixed"
        style={ROOT}
        backgroundImage={backgroundImage}
        backgroundColor={palette.portGore}
      >
        <View style={TOP_CONTAINER}>
          <Text preset="header" tx="welcomeScreen.header1" style={HEADER1} />
          <Text preset="header" tx="welcomeScreen.header2" style={HEADER2} />
          <Text preset="subheader" tx="welcomeScreen.subtitle" style={SUBHEADER} />
        </View>
        <Footer>
          <Button
            tx="welcomeScreen.nextScreenButton"
            onPress={nextScreen}
            style={{ width: 335, height: 50, borderRadius: 0 }}
            textStyle={{ fontSize: 14, fontWeight: "500" }}
            testID={"next-screen-button"}
          />
        </Footer>
      </Screen>
    )
  },
)
