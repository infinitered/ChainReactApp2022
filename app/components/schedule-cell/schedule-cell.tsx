/**
 * TODO: Convert this to a functional component.
 *
 * Sure, it works fine as a class component, but we really want to modernize this code
 * base from 2018 when it was originally created.
 */

import * as React from "react"
import {
  Animated,
  Image,
  ImageStyle,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { ScheduleCellPresets } from "./schedule-cell.presets"
import { ScheduleCellProps } from "./schedule-cell.props"
import { Text } from "../text/text"
import { palette } from "../../theme"
import { formatToTimeZone } from "date-fns-timezone"
import { TIMEZONE } from "../../utils/info"

export class ScheduleCell extends React.Component<ScheduleCellProps, {}> {
  state = { animatedSize: new Animated.Value(1) }

  handlePressIn = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start()
  }

  handlePressOut = () => {
    Animated.spring(this.state.animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { preset, index, event, onPress, noTime } = this.props
    const style: any = ScheduleCellPresets[preset] || ScheduleCellPresets.default
    const isOdd = index % 2 === 0 // index starts at 0
    const speakerName = event && event.speakers ? event.speakers.map((s) => s.name).join(", ") : ""
    if (!event) return null
    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={() => onPress(this.props.event)}
      >
        <Animated.View
          style={[
            style.root as ViewStyle,
            { transform: [{ scale: this.state.animatedSize }] },
            isOdd && { backgroundColor: palette.portGoreLighter },
          ]}
        >
          {noTime ? this.renderTopBorder() : this.renderTime()}
          <View style={style.contentWrapper as ViewStyle}>
            <View style={style.imageWrapper as ViewStyle}>{this.renderImage()}</View>
            <View style={style.content as ViewStyle}>
              <Text preset="subheader" text={event.title} style={style.title as TextStyle} />
              {event && event.speakers && event.speakers.length > 0 && event.speakers[0].name && (
                <Text preset="subheader" text={speakerName} style={style.speaker as TextStyle} />
              )}
              {preset === "afterparty" && (
                <Text
                  preset="subheader"
                  text={event.description}
                  style={style.speaker as TextStyle}
                />
              )}
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  renderTopBorder = () => {
    return <View style={{ width: "100%", backgroundColor: palette.mantiniqueLight, height: 1 }} />
  }

  renderTime = () => {
    const { preset, event } = this.props
    const style: any = ScheduleCellPresets[preset] || ScheduleCellPresets.default
    const label = `${formatToTimeZone(event.startTime, "h:mm A", {
      timeZone: TIMEZONE,
    })} - ${formatToTimeZone(event.endTime, "h:mm A", { timeZone: TIMEZONE })}`
    return (
      <View style={style.timeWrapper as ViewStyle}>
        {event.track && event.track !== "NONE" && (
          <Text preset="label" text={event.track} style={style.track} />
        )}
        <Text preset="label" text={label} style={style.time as TextStyle} />
      </View>
    )
  }

  renderImage = () => {
    const {
      preset,
      event: { sponsor, eventType, speakers },
      event,
    } = this.props
    const style: any = ScheduleCellPresets[preset] || ScheduleCellPresets.default
    let image = null
    const eventTypeLower = eventType ? eventType.toLowerCase() : ""

    if (eventTypeLower === "panel") {
      image = require("./images/panelist.png")
    } else if (eventTypeLower === "afterparty") {
      if (sponsor === "G2i") image = require("./images/afterparty-G2i.png")
      if (sponsor === "Bumped") image = require("./images/sponsor-bumped.png")
    } else if (eventTypeLower === "break") {
      image = require("./images/coffee-small.png")
    } else if (["talk", "workshop", "welcome", "goodbye"].includes(eventTypeLower)) {
      image = speakers && speakers[0] && speakers[0].image ? { uri: speakers[0].image } : null
    } else if (eventTypeLower === "lunch") {
      image = require("./images/lunch.png")
    } else if (eventTypeLower === "breakfast") {
      image = require("./images/registration.png")
    } else {
      if (event.image) image = { uri: event.image }
    }
    if (image) {
      return <Image source={image} style={style.image as ImageStyle} />
    } else {
      return null
    }
  }
}
