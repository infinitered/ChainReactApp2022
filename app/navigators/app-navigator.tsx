/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CodeOfConductScreen, ScheduleScreen, VenueScreen, WelcomeScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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

export type TabNavigatorParamList = {
  schedule: NavigatorScreenParams<ScheduleNavigatorParamList>
  venue: undefined
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
        TabNavigatorParamList {}
  }
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const ScheduleStack = createNativeStackNavigator<ScheduleNavigatorParamList>()

const Schedule = () => {
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ScheduleStack.Screen name="scheduleScreen" component={ScheduleScreen} />
      <ScheduleStack.Screen name="eventDetails" component={EventDetailsScreen} />
      <ScheduleStack.Screen name="scheduleCodeOfConduct" component={CodeOfConductScreen} />
    </ScheduleStack.Navigator>
  )
}

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon routeName={route.name} focused={focused} />,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color.tabbar,
          height: 75,
          paddingVertical: spacing.tiny,
        },
        tabBarActiveTintColor: palette.white,
      })}
      initialRouteName="venue"
    >
      <Tab.Screen name="schedule" component={Schedule} />
      <Tab.Screen name="venue" component={VenueScreen} />
    </Tab.Navigator>
  )
}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef as any} // TODO: fix ref typings (someone want to submit a PR?)
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
