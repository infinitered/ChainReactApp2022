/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainerProps } from "@react-navigation/core"
import {
  CodeOfConductScreen,
  InfoScreen,
  ScheduleScreen,
  VenueScreen,
  WelcomeScreen,
} from "../screens"
import { navigationRef } from "./navigation-utilities"
import { color, palette, spacing } from "../theme"
import { TabIcon } from "../components"
import { EventDetailsScreen } from "../screens/event-details/event-details-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  tabs: NavigatorScreenParams<ScheduleNavigatorParamList>
}

export type ScheduleNavigatorParamList = {
  scheduleScreen: undefined
  eventDetails: undefined
  scheduleCodeOfConduct: undefined
}

export type InfoNavigatorParamList = {
  infoScreen: undefined
  infoCodeOfConduct: undefined
}

export type TabNavigatorParamList = {
  schedule: NavigatorScreenParams<ScheduleNavigatorParamList>
  venue: undefined
  info: undefined
}

declare global {
  /**
   * TypeScript definitions for `useNavigation` can be extended by using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
   * More: https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc
   */
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList
      extends NavigatorParamList,
        ScheduleNavigatorParamList,
        InfoNavigatorParamList,
        TabNavigatorParamList {}
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const ScheduleStack = createNativeStackNavigator<ScheduleNavigatorParamList>()
const InfoStack = createNativeStackNavigator<InfoNavigatorParamList>()

const Schedule = () => {
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: { backgroundColor: color.palette.portGore },
        // headerBackImage: <BackButton backTitle={"Back"} />,
        headerTintColor: color.palette.shamrock,
      }}
    >
      <ScheduleStack.Screen
        name="scheduleScreen"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <ScheduleStack.Screen name="eventDetails" component={EventDetailsScreen} />
      <ScheduleStack.Screen name="scheduleCodeOfConduct" component={CodeOfConductScreen} />
    </ScheduleStack.Navigator>
  )
}

const Info = () => {
  return (
    <InfoStack.Navigator
      screenOptions={{
        headerTintColor: color.palette.shamrock,
        headerStyle: { backgroundColor: color.palette.portGore },
      }}
    >
      <InfoStack.Screen name="infoScreen" component={InfoScreen} options={{ headerShown: false }} />
      <InfoStack.Screen name="infoCodeOfConduct" component={CodeOfConductScreen} />
    </InfoStack.Navigator>
  )
}

const MainTabs = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: palette.portGore }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon routeName={route.name} focused={focused} />,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.tabbar,
          height: 55 + bottom,
          paddingTop: spacing.tiny,
          paddingBottom: bottom + spacing.tiny,
        },
        tabBarActiveTintColor: palette.white,
      })}
      initialRouteName="venue"
    >
      <Tab.Screen name="schedule" component={Schedule} />
      <Tab.Screen name="venue" component={VenueScreen} />
      <Tab.Screen name="info" component={Info} />
    </Tab.Navigator>
  )
}

export const AppNavigator = (props: Partial<NavigationContainerProps>) => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="welcome"
      >
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="tabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome", "tabs"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
