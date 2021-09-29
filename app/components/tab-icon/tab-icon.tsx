import React from "react"
import { Image, ImageStyle } from "react-native"

const ICON: ImageStyle = {
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  maxHeight: 24,
  maxWidth: 24,
}

const TAB_ICONS = {
  schedule: require("./icons/calendar.inactive.png"),
  scheduleActive: require("./icons/calendar.active.png"),
  venue: require("./icons/map.inactive.png"),
  venueActive: require("./icons/map.active.png"),
  info: require("./icons/info.inactive.png"),
  infoActive: require("./icons/info.active.png"),
  profile: require("./icons/profile.inactive.png"),
  profileActive: require("./icons/profile.active.png"),
}

interface Props {
  focused?: boolean
  routeName: keyof typeof TAB_ICONS
}

export const TabIcon = ({ routeName, focused }: Props) => {
  const tabName = focused ? `${routeName}Active` : routeName

  return <Image style={ICON} source={TAB_ICONS[tabName]} />
}
