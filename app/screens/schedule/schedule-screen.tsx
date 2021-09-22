import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, TextStyle, ViewStyle } from "react-native"
import { ScheduleNav, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
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

export const ScheduleScreen = observer(function ScheduleScreen() {
  // Pull in one of our MST stores
  const { eventStore } = useStores()

  const [selected, setSelected] = useState<EVENT_DAYS>(getSelectedDay())
  const [refreshing, setRefreshing] = useState<boolean>(false)

  async function refreshData() {
    setRefreshing(true)
    await eventStore.getAll()
    setRefreshing(false)
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <Screen preset="fixed" backgroundColor={color.palette.portGore} style={ROOT}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        key={`${selected}-scrollview`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshData} />}
      >
        <Text preset="title" tx="scheduleScreen.title" style={TITLE} />
        {selected === "wednesday" ? (
          <ScheduleWorkshops eventStore={eventStore} />
        ) : (
          <ScheduleContent eventStore={eventStore} selected={selected} />
        )}
      </ScrollView>
      <ScheduleNav selected={selected} onSelected={(sel) => setSelected(sel)} />
    </Screen>
  )
})

const getSelectedDay = (): EVENT_DAYS => {
  const date = new Date()
  if (isThursday(date)) return "thursday"
  if (isFriday(date)) return "friday"
  return "wednesday"
}
