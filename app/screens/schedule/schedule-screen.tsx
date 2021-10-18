import React, { useState, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { ScheduleNav, Screen, Text } from "../../components"
import { color, palette, spacing } from "../../theme"
import { EVENT_DAYS, useStores } from "../../models"
import { isFriday, isThursday } from "date-fns"
import { ScheduleWorkshops } from "./schedule-workshops"
import { ScheduleContent } from "./schedule-content"

const ROOT: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
}

const TITLE: TextStyle = {
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const ERROR: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.small,
  backgroundColor: palette.ebony,
}

const ERROR_TITLE: TextStyle = {
  fontWeight: "bold",
  color: palette.angry,
}

const ERROR_MESSAGE: TextStyle = {
  color: palette.waterloo,
}

const EventError = observer(() => {
  const { eventStore } = useStores()

  if (eventStore.status !== "error") return null

  return (
    <View style={ERROR}>
      <Text style={ERROR_TITLE} tx="scheduleScreen.errorFetching" />
      <Text style={ERROR_MESSAGE} text={eventStore.errorMessage} />
    </View>
  )
})

export const ScheduleScreen = function ScheduleScreen() {
  // Pull in one of our MST stores
  const { eventStore } = useStores()

  const [selected, setSelected] = useState<EVENT_DAYS>(getSelectedDay())
  const [refreshing, setRefreshing] = useState<boolean>(false)

  async function refreshData() {
    setRefreshing(true)
    await eventStore.refresh()
    setRefreshing(false)
  }

  useLayoutEffect(() => {
    eventStore.refresh()
  }, [])

  return (
    <Screen preset="fixed" backgroundColor={color.palette.portGore} style={ROOT}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        key={`${selected}-scrollview`}
        refreshControl={
          <RefreshControl tintColor="#FFFFFF" refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        <Text preset="title" tx="scheduleScreen.title" style={TITLE} />
        <EventError />
        {selected === "wednesday" ? (
          <ScheduleWorkshops />
        ) : (
          <ScheduleContent eventStore={eventStore} selected={selected} />
        )}
      </ScrollView>
      <ScheduleNav selected={selected} onSelected={(sel) => setSelected(sel)} />
    </Screen>
  )
}

const getSelectedDay = (): EVENT_DAYS => {
  const date = new Date()
  if (isThursday(date)) return "thursday"
  if (isFriday(date)) return "friday"
  return "wednesday"
}
