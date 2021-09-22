import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { ScheduleCell, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { Event, EventStore, EVENT_DAYS, useStores } from "../../models"
import { isFriday, isThursday } from "date-fns"
import { useNavigation } from "@react-navigation/core"
import { ScheduleCellPresetNames } from "../../components/schedule-cell/schedule-cell.presets"
import { convertToTimeZone } from "date-fns-timezone"
import { TIMEZONE } from "../../utils/info"

const ROOT: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
}

const TITLE: TextStyle = {
  marginTop: spacing.extraLarge,
  paddingHorizontal: spacing.large,
}
const SUBTITLE: TextStyle = {
  color: color.palette.white,
  fontWeight: "600",
  paddingHorizontal: spacing.large,
  marginTop: spacing.small,
}
const DATE: TextStyle = {
  fontStyle: "italic",
  fontWeight: "400",
  paddingHorizontal: spacing.large,
  marginBottom: spacing.small + spacing.large,
}

type RenderEventProps = { event: Event; index: number }
const RenderEvent = ({ event, index }: RenderEventProps) => {
  const navigation = useNavigation()

  const eventType = event.eventType.toLowerCase()
  const cellPreset: ScheduleCellPresetNames =
    eventType === "break" || eventType === "afterparty" ? eventType : "default"
  console.log("this is a event item::::::: ", event)
  return (
    <ScheduleCell
      index={index}
      event={event}
      preset={cellPreset}
      onPress={(event: Event) => {
        navigation.navigate("eventDetails", { event })
      }}
      key={index}
    />
  )
}

const ScheduleWorkshops = ({ eventStore }) => {
  const navigation = useNavigation()

  const { events } = eventStore
  const beginnerWorkshop = events.find((event) => event.track === "BEGINNER")
  const intermediateWorkshop = events.find((event) => event.track === "INTERMEDIATE")
  const advancedWorkshop = events.find((event) => event.track === "ADVANCED")
  const welcomeParty = events.find((event) => event.eventType === "AFTERPARTY")
  const onPressWorkshop = (event) => navigation.navigate("eventDetails", { event })

  return (
    <View>
      <Text tx="scheduleScreen.workshops" style={SUBTITLE} preset="subheader" />
      <Text tx="scheduleScreen.workshopsDate" style={DATE} preset="label" />
      <ScheduleCell index={0} event={beginnerWorkshop} onPress={onPressWorkshop} />
      <ScheduleCell index={1} event={intermediateWorkshop} onPress={onPressWorkshop} />
      <ScheduleCell index={2} event={advancedWorkshop} onPress={onPressWorkshop} />
      <ScheduleCell
        index={3}
        preset={"afterparty"}
        event={welcomeParty}
        onPress={onPressWorkshop}
      />
    </View>
  )
}

type ScheduleContentProps = {
  eventStore: EventStore
  selected: EVENT_DAYS
}
const ScheduleContent = ({ eventStore, selected }: ScheduleContentProps) => {
  const { events } = eventStore
  const selectedEvents: Event[] = events.filter((event) => {
    const zonedStartTime = convertToTimeZone(event.startTime, { timeZone: TIMEZONE })
    return selected === "thursday" ? isThursday(zonedStartTime) : isFriday(zonedStartTime)
  })
  return (
    <View>
      <Text
        tx={`scheduleScreen.${selected === "thursday" ? "day1" : "day2"}`}
        style={SUBTITLE}
        preset="subheader"
      />
      <Text
        tx={`scheduleScreen.${selected === "thursday" ? "day1" : "day2"}Date`}
        style={DATE}
        preset="label"
      />
      {selectedEvents &&
        selectedEvents.map((event, index) => <RenderEvent event={event} index={index} />)}
    </View>
  )
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
      {/* <ScheduleNav selected={this.state.selected} onSelected={this.onSelected} /> */}
    </Screen>
  )
})

const getSelectedDay = (): EVENT_DAYS => {
  const date = new Date()
  if (isThursday(date)) return "thursday"
  if (isFriday(date)) return "friday"
  return "wednesday"
}
